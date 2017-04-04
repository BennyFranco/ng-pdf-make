import { Injectable } from '@angular/core';
import { Table } from '../objects/table';

declare const pdfMake;

@Injectable()
export class PdfmakeService {

  pageSize = 'LETTER';
  pageOrientation = 'portrait';

  private base64textString = '';

  docDefinition: any = {
    pageSize: this.pageSize,
    pageOrientation: this.pageOrientation,
    content: [],
    styles: {}
  };

  constructor() { }

  open() {
    pdfMake.createPdf(this.docDefinition).open();
  }

  print() {
    pdfMake.createPdf(this.docDefinition).print();
  }

  download(name?: string) {
    pdfMake.createPdf(this.docDefinition).download(name);
  }

  configureStyles(styles) {
    this.docDefinition.styles = styles;
  }

  addText(text: string, style?: string) {
    if (style) {
      this.docDefinition.content.push({ text: text, style: style });
      return;
    }
    this.docDefinition.content.push(text);
  }

  addColumns(columnsText: string[]) {
    const columns = [];
    for (const column of columnsText) {
      columns.push({ text: column });
    }

    this.docDefinition.content.push({ columns: columns });
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

      this.docDefinition.content.push(tableDictionary);
    }
  }

  addImage(url: string, width?: number, height?: number) {
    let data;
    const image = new Image();

    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      canvas.getContext('2d').drawImage(image, 0, 0);

      data = canvas.toDataURL('image/png');
      let dict;
      if (width) {
        if (height) {
          dict = { image: data, width: width, height: height };
        } else {
          dict = { image: data, width: width };
        }
      } else {
        dict = { image: data };
      }

      this.docDefinition.content.push(dict);
    };
  }

  addUnorderedlist(items: any[]) {
    this.docDefinition.content.push({ ul: items });
  }

  addOrderedList(items: any[], reversed?: boolean, start?: number) {
    if (reversed) {
      this.docDefinition.content.push({ reversed: reversed, ol: items });
    } else if (reversed && start) {
      this.docDefinition.content.push({ reversed: reversed, start: start, ol: items });
    } else if (start) {
      this.docDefinition.content.push({ start: start, ol: items });
    } else {
      this.docDefinition.content.push({ ol: items });
    }
  }
}
