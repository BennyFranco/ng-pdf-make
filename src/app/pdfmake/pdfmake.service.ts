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

  constructor() {
    this.pdfMake = pdfMakeCore;
    this.pdfMake.vfs = pdfMakeFonts.pdfMake.vfs

    if (!this.documentDefinition) {
      this.documentDefinition = new PdfDefinition();
    }
  }

  open() {
    this.pdfMake.createPdf(this.documentDefinition).open();
  }

  print() {
    this.pdfMake.createPdf(this.documentDefinition).print();
  }

  download(name?: string) {
    this.pdfMake.createPdf(this.documentDefinition).download(name);
  }

  configureStyles(styles: any) {
    this.documentDefinition.styles = styles;
  }

  addText(text: string, style?: string) {
    if (style) {
      this.documentDefinition.content.push({ text: text, style: style });
      return;
    }
    this.documentDefinition.content.push(text);
  }

  addColumns(columnsText: string[]) {
    const columns = [];
    for (const column of columnsText) {
      columns.push({ text: column });
    }

    this.documentDefinition.content.push({ columns: columns });
  }

  addTable(table: Table) {
    const body = [];
    let row = [];

    if (table) {
      for (const header of table.headers.cells) {
        row.push(header.content);
      }

      body.push(row);

      for (const rowObj of table.rows) {
        row = [];
        for (const cell of rowObj.cells) {
          row.push(cell.content);
        }
        body.push(row);
      }

      let tableDictionary;

      if (table.widths) {
        tableDictionary = {
          table:
          {
            widths: table.widths,
            body: body
          }
        };
      } else {
        tableDictionary = { table: { body: body } };
      }

      this.documentDefinition.content.push(tableDictionary);
    }
  }

  addImage(url: string, width?: number, height?: number) {
    const image = new Image();

    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      canvas.getContext('2d').drawImage(image, 0, 0);

      if (width && !height) {
        height = width;
      }

      let finalImage = {
        image: canvas.toDataURL('image/png'),
        width: width ? width : image.naturalWidth,
        height: height ? height : image.naturalHeight
      };

      this.documentDefinition.content.push(finalImage);
    };
  }

  addUnorderedlist(items: any[]) {
    this.documentDefinition.content.push({ ul: items });
  }

  addOrderedList(items: any[], reversed?: boolean, start?: number) {
    if (reversed) {
      this.documentDefinition.content.push({ reversed: reversed, ol: items });
    } else if (reversed && start) {
      this.documentDefinition.content.push({ reversed: reversed, start: start, ol: items });
    } else if (start) {
      this.documentDefinition.content.push({ start: start, ol: items });
    } else {
      this.documentDefinition.content.push({ ol: items });
    }
  }
}
