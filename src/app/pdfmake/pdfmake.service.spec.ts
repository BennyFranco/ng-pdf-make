import { TestBed, inject } from '@angular/core/testing';

import { PdfmakeService } from './pdfmake.service';

describe('PdfmakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfmakeService]
    });
  });

  it('should ...', inject([PdfmakeService], (service: PdfmakeService) => {
    expect(service).toBeTruthy();
  }));
});
