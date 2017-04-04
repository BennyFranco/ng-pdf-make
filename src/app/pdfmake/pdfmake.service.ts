import { Injectable } from '@angular/core';
import { Table } from '../objects/table';

declare const pdfMake;

@Injectable()
export class PdfmakeService {
  docDefinition: any = {
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

      const tableDictionary = { table: { body: body } };

      this.docDefinition.content.push(tableDictionary);
    }
  }
}
