import { TestBed } from '@angular/core/testing';

import { FallbackImageConverterService } from './fallback-image-converter.service';

describe('FallbackImageConverterService', () => {
  let service: FallbackImageConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FallbackImageConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
