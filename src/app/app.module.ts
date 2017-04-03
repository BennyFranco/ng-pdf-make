import { PdfmakeModule } from './pdfmake/pdfmake.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example/example.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    PdfmakeModule
  ],
  declarations: [ExampleComponent],
  exports: [],
  bootstrap: [ExampleComponent]
})
export class AppModule { }
