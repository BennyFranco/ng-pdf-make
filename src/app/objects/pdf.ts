import { TDocumentDefinitions, TDocumentInformation, PageSize, PageOrientation } from 'pdfmake/build/pdfmake';

export class PdfDefinition implements TDocumentDefinitions {
  info?: TDocumentInformation;
  header?: any;
  footer?: any;
  content: any;
  styles?: any;
  pageSize?: PageSize;
  pageOrientation?: PageOrientation;
  pageMargins?: [number, number, number, number];
  defaultStyle?: {
    font?: string;
  };

  constructor() {
    this.content = [];
  }
}
