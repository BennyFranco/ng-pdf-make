import { TDocumentDefinitions, TDocumentInformation, pageSizeType, pageOrientationType } from 'pdfmake/build/pdfmake';

export class PdfDefinition implements TDocumentDefinitions {
  info?: TDocumentInformation;
  header?: any;
  footer?: any;
  content: any;
  styles?: any;
  pageSize?: pageSizeType;
  pageOrientation?: pageOrientationType;
  pageMargins?: [number, number, number, number];
  defaultStyle?: {
    font?: string;
  };

  constructor() {
    this.content = [];
  }
}
