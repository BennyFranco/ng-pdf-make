import { Injectable } from '@angular/core';
import { Table } from '../objects/table';

declare const pdfMake;

@Injectable()
export class PdfmakeService {

  pageSize = 'LETTER';
  pageOrientation = 'portrait';

  private base64textString = '';

  docDefinition: any = null;

  constructor() { }

  open() {
    this.validateIfOpened(pdfMake.createPdf(this.docDefinition).open);
  }

  print() {
    this.validateIfOpened(pdfMake.createPdf(this.docDefinition).print);
  }

  download(name?: string) {
    this.validateIfOpened(args => pdfMake.createPdf(this.docDefinition).download(args[0]), name);
  }

  configureStyles(styles) {
    this.validateIfOpened(args => this.docDefinition.styles = args[0], styles);
  }

  clear(){
    this.validateIfOpened(() => this.docDefinition.content = []);
  }

  close(){
    this.docDefinition = null;
  }
  
  openPDF(){
    if(!this.isOpen()){
      this.docDefinition = {
        pageSize: this.pageSize,
        pageOrientation: this.pageOrientation,
        content: [],
        styles: {}
      };
    }
  }

  isOpen(): boolean {
    return this.docDefinition != null;
  }

  addText(text: string, style?: string) {
    this.validateIfOpened(args => {
      let txt = args[0];
      let st = args[1];

      if (st) {
        this.docDefinition.content.push({ text: txt, style: st });
        return;
      }
      this.docDefinition.content.push(txt);
    }, text, style);
  }

  addColumns(columnsText: string[]) {
    this.validateIfOpened(colTxt => {
      const columns = [];
      for (const column of colTxt) {
        columns.push({ text: column });
      }
  
      this.docDefinition.content.push({ columns: columns });
    }, columnsText);
  }

  addTable(table: Table) {
    this.validateIfOpened(tbl => {
      
      const body = [];
      let row = [];
      
      if (tbl) {
        tbl = tbl[0];
    
        for (const header of tbl.headers.cells) {
          row.push(header.content);
        }
  
        body.push(row);
  
        for (const rowObj of tbl.rows) {
          row = [];
          for (const cell of rowObj.cells) {
            // if(typeof cell.content == 'string'){
  
            // }
            row.push(cell.content);
          }
          body.push(row);
        }
  
        let tableDictionary;
  
        if (tbl.widths) {
          tableDictionary = {
            table:
            {
              widths: tbl.widths,
              body: body
            }
          };
        } else {
          tableDictionary = { table: { body: body } };
        }
  
        this.docDefinition.content.push(tableDictionary);
      }
    }, table);
  }

  addImage(url: string, width?: number, height?: number) {
    this.validateIfOpened( args => {
      let u = args[0];
      let w = args[1];
      let h = args[2];

      let data;
      const image = new Image();
  
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = u;
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
  
        canvas.getContext('2d').drawImage(image, 0, 0);
  
        data = canvas.toDataURL('image/png');
        let dict;
        if (w) {
          if (h) {
            dict = { image: data, width: w, height: h };
          } else {
            dict = { image: data, width: w };
          }
        } else {
          dict = { image: data };
        }
  
        this.docDefinition.content.push(dict);
      };
    }, url, width, height);
  }

  addUnorderedlist(items: any[]) {
    this.validateIfOpened(args => this.docDefinition.content.push({ ul: args[0] }), items);
  }

  addOrderedList(items: any[], reversed?: boolean, start?: number) {
    this.validateIfOpened(args => {
      let itms = args[0];
      let rvrd = args[1];
      let strt = args[2];

      if (rvrd) {
        this.docDefinition.content.push({ reversed: rvrd, ol: itms });
      } else if (rvrd && strt) {
        this.docDefinition.content.push({ reversed: rvrd, start: strt, ol: itms });
      } else if (strt) {
        this.docDefinition.content.push({ start: strt, ol: itms });
      } else {
        this.docDefinition.content.push({ ol: itms });
      }
    }, items, reversed, start);
  }

  validateIfOpened(fn, ...args){
    if(this.isOpen()){
      fn(args);
    }else{
      throw new Error('The document isn\'t open! Please use the "openPDF()" method to open it before use it.');
    }
  }
}
