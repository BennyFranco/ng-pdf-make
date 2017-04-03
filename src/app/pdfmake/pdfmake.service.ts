import { Injectable } from '@angular/core';

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

  download() {
    pdfMake.createPdf(this.docDefinition).download();
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
}
