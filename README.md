# ng-pdf-make

This is library creates a bridge to use [pdfmake](http://pdfmake.org) library with your
angular 2 implementation.

# Notice:

```
The update 0.1.0 is released to fix some of the issues reported and was updated to continue working with angular 2.x.
The angular 4/6 support will be relased in the future, be pacient. 
```

## Install

You can get it on npm:

`npm install ng-pdf-make --save`

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
- Inline text styles using css format.
- Columns widths and styles using css style format.

## To do
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
  constructor(public pdfmake: PdfmakeService) { }

  ngOnInit() {

    // Create a pdf document
    // IMPORTANT: if a document was created before, this method will destroy it and
    // create a new instance.
    this.pdfmake.create();

    // Configure text styles  
    this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true } });

    // Add a text with style
    this.pdfmake.addText('This is a header, using header style', 'header');

    // Add a text with custom style
    this.pdfmake.addText('This is a header, using a custom style', { fontSize: 16, bold: true });

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

    // Destroy pdf instance
    // You can destroy intencionally the pdf instance
    // this.pdfmake.destroy();
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
    const header3 = new Cell('Header3', { fillColor: '#cecece' });

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

If you need to use some unimplemented function, you can send the tradicional dictionary document structure to the `documentDefinition` attribute in the service.

```typescript
    pdfmake.documentDefinition = { ... }
```

## Credits

* [pdfmake](http://pdfmake.org) by  [@bpampuch](https://github.com/bpampuch) and [@liborm85](https://github.com/liborm85)
* [@jtpdev](https://github.com/jtpdev) - Suggestions, features and an alternative library here [https://github.com/jtpdev/ng-pdf-make](https://github.com/jtpdev/ng-pdf-make)
