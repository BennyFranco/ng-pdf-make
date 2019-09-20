import { Injectable } from '@angular/core';
import { Table } from '../objects/table';
import { PdfDefinition } from '../objects/pdf';
import * as pdfMakeCore from 'pdfmake/build/pdfmake';
import * as pdfMakeFonts from 'pdfmake/build/vfs_fonts';

@Injectable()
export class PdfmakeService {

  pageSize: pdfMakeCore.pageSizeType = 'LETTER';
  pageOrientation: pdfMakeCore.pageOrientationType = 'portrait';
  documentDefinition: PdfDefinition;

  private pdfMake: any;

  private base64;

  constructor() {
    this.pdfMake = pdfMakeCore;
    this.pdfMake.vfs = pdfMakeFonts.pdfMake.vfs;
  }

  create() {
    if (this.documentDefinition) {
      this.destroy();
    }
    this.documentDefinition = new PdfDefinition();
  }

  destroy() {
    this.documentDefinition = null;
  }

  open() {
    this.pdfMake.createPdf(this.getPdfDefinition()).open();
  }

  print() {
    this.pdfMake.createPdf(this.getPdfDefinition()).print();
  }

  download(name?: string) {
    this.pdfMake.createPdf(this.getPdfDefinition()).download(name);
  }

  configureStyles(styles: any) {
    this.getPdfDefinition().styles = styles;
  }

  addText(text: string, style?: any | string, pageBreak?: string) {
    this.getPdfDefinition().content.push({ text: text, style: style, pageBreak: pageBreak });
  }

  addColumns(columnsText: string[]) {
    const columns = [];
    for (const column of columnsText) {
      columns.push({ text: column });
    }

    this.getPdfDefinition().content.push({ columns: columns });
  }

  addTable(table: Table) {
    const body = [];

    if (table) {
      if (table.headers) {
        body.push(table.headers.get());
      }

      if (table.rows) {
        for (const row of table.rows) {
          body.push(row.get());
        }
      }

      this.getPdfDefinition().content.push({ table: { widths: table.widths, body: body } });
    }
  }

  addImage(url: string, width?: number, height?: number) {
    const image = new Image();

    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;

    image.onload = () => {
      let canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      canvas.getContext('2d').drawImage(image, 0, 0);

      if (width && !height) {
        height = width;
      }

      const finalImage = {
        image: canvas.toDataURL('image/png'),
        width: width ? width : image.naturalWidth,
        height: height ? height : image.naturalHeight
      };

      this.getPdfDefinition().content.push(finalImage);

      canvas = null;
    };
  }

  addUnorderedlist(items: any[]) {
    this.documentDefinition.content.push({ ul: items });
  }

  addOrderedList(items: any[], reversed = false, start?: number) {
    this.getPdfDefinition().content.push({ reversed: reversed, start: start, ol: items });
  }

  private getPdfDefinition() {
    if (this.documentDefinition) {
      return this.documentDefinition;
    } else {
      throw new Error('The document isn\'t open! Please use the create()" method to open it before use it.');
    }
  }
}
