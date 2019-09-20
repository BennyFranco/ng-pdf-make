import { Component, OnInit } from '@angular/core';
import { PdfmakeService } from '../pdfmake/pdfmake.service';
import { Cell, Row, Table } from '../objects/table';

@Component({
  selector: 'ng-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  constructor(public pdfmake: PdfmakeService) { }

  ngOnInit() {
    this.pdfmake.create();
    this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true } });
    this.pdfmake.addText('This is a header, using header style', 'header');
    this.pdfmake.addText('This is a header, using a custom style', { fontSize: 16, bold: true });
    this.pdfmake.addText('This is an sample PDF printed with pdfMake');
    // tslint:disable-next-line:max-line-length
    this.pdfmake.addText('Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines');

    const columns = [
      // tslint:disable-next-line:max-line-length
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
    ];

    this.pdfmake.addColumns(columns);

    const header1 = new Cell('Header1');
    const header2 = new Cell('Header2');
    const header3 = new Cell('Header3', { fillColor: '#cecece' });

    const headerRows = new Row([header1, header2, header3]);

    const row1 = new Row([new Cell('One value goes here '), new Cell('Another one here'), new Cell('OK?')]);

    const widths = [100, '*', 200, '*'];
    const table = new Table(headerRows, [row1], widths);

    this.pdfmake.addTable(table);

    const list1 = ['item 1', 'item 2', 'item 3'];
    const list2 = ['item 1', 'item 2', 'item 3'];
    const list3 = ['item 1', 'item 2', 'item 3'];
    const list4 = ['item 1', 'item 2', 'item 3'];

    this.pdfmake.addUnorderedlist(list1);
    this.pdfmake.addOrderedList(list2);
    this.pdfmake.addOrderedList(list3, true);
    this.pdfmake.addOrderedList(list4, false, 50);

    this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png');
    this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png', 300, 150);
    this.pdfmake.addImage('http://localhost:4200/assets/daniel.jpg', 200);
  }
}
