import { TestBed } from '@angular/core/testing';

import { JsImageConverterService } from './js-image-converter.service';

describe('JsImageConverterService', () => {
  let service: JsImageConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsImageConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
