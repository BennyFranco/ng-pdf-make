# ng-pdfmake

This is library creates a bridge to use [pdfmake](http://pdfmake.org) library with your
angular 2 implementation.
It's a fork of BennyFranco repository: [ng-pdf-make](https://github.com/BennyFranco/ng-pdf-make), the fork you can see [here](https://github.com/jtpdev/ng-pdf-make).

## Install

You can get it on npm:

`npm install jtpdev-pdfmaker --save`

## Ready

pdfmake is fully customizable, so for now the options ready to use are:
- Simple text insertion.
- Some Styles for text.
- Basic Columns.
- Basic Tables with custom column width.
- Ordered list with reverse and start properties.
- Unordered list.
- Images from url, with custom width and height properties.
- Download function with custom file name.
- Open function.
- Print function.
- Page properties (Size and orientation).

## To do
- Inline text styles.
- Columns widths and styles.
- Nested tables.
- More customizable tables.
- Nested Lists.
- Margins.

## Setup

You'll need to add `PdfmakeModule` to your application module.

```typescript
import { PdfmakeModule } from 'ng-pdf-make';

    @NgModule({
      imports: [
        PdfmakeModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [],
      bootstrap: [AppComponent]

      export class AppModule {}
})
```

## Usage

Use the pdfmake service in your component:

```typescript

import { Component, OnInit } from '@angular/core';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';

@Component({
  selector: 'ng-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  // Inject pdfmake service
  constructor(private pdfmake: PdfmakeService) { }

  ngOnInit() {

    // Configure text styles  
    this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true } });

    // Add a text with style
    this.pdfmake.addText('This is a header, using header style', 'header');

    // Add simple text
    this.pdfmake.addText('This is an sample PDF printed with pdfMake');

    // Add large text
    this.pdfmake.addText('Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines');

    // Array with colums
    const columns = [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
    ];

    // Add columns
    this.pdfmake.addColumns(columns);

    // List to add
    const list1 = ['item 1', 'item 2', 'item 3'];
    const list2 = ['item 1', 'item 2', 'item 3'];
    const list3 = ['item 1', 'item 2', 'item 3'];
    const list4 = ['item 1', 'item 2', 'item 3'];

    // Adding unordered list
    this.pdfmake.addUnorderedlist(list1);

    // Adding ordered list
    this.pdfmake.addOrderedList(list2);

    // Adding reversed oredered list
    this.pdfmake.addOrderedList(list3, true);

    // Adding ordered list starting at 50
    this.pdfmake.addOrderedList(list4, false, 50);

    // Add image from url
    this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png');

    // Add image from url using custom width and height.
    this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png', 300, 150);

    // Add image from localhost and using width
    this.pdfmake.addImage('http://localhost:4200/assets/daniel.jpg', 200);
  }
}

```

### Use tables
To use tables is necesary import some objects to create cells, rows an the table:

```typescript
import { Component, OnInit } from '@angular/core';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';

@Component({
  selector: 'ng-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  constructor(private pdfmake: PdfmakeService) { }

  ngOnInit() {

    // Create Headers cells
    const header1 = new Cell('Header1');
    const header2 = new Cell('Header2');
    const header3 = new Cell('Header3');

    // Create headers row
    const headerRows = new Row([header1, header2, header3]);

    // Create a content row
    const row1 = new Row([new Cell('One value goes here '), new Cell('Another one here'), new Cell('OK?')]);

    // Custom  column widths
    const widths = [100, '*', 200, '*'];

    // Create table object
    const table = new Table(headerRows, [row1], widths);

    // Add table to document
    this.pdfmake.addTable(table);
  }
}

```

### Functions
To use the open, download and print functions you can override the methods in the service or call it directly.

in your view
```html
<button (click)="pdfmake.open()">Open PDF</button>
<button (click)="pdfmake.print()">Print PDF</button>
<button (click)="pdfmake.download()">Download PDF</button>
```

or 

in your controller

```typescript
    openPdf(){
        this.pdfmake.open();
    }

    printPdf(){
        this.pdfmake.print();
    }

    downloadPDF(){
        this.pdfmake.download();
    }

    downloadPdfWithName(customName: string){
        this.pdfmake.download(customName);
    }
```

## Advance

If you need to use some unimplemented function, you can send the tradicional dictionary document structure to the `docDefinition` attribute in the service.

```typescript
    pdfmake.docDefinition = { ... }
```