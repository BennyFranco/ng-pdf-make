import { Injectable } from '@angular/core';

declare const pdfMake;

@Injectable()
export class PdfmakeService {
  docDefinition;

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
}
