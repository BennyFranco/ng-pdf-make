import { Component, OnInit } from '@angular/core';
import { PdfmakeService } from '../pdfmake/pdfmake.service';

@Component({
  selector: 'ng-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  constructor(private pdfmake: PdfmakeService) { }

  ngOnInit() {
    this.pdfmake.docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  }
}
