import { TestBed } from '@angular/core/testing';

import { WasmImageConverterService } from './wasm-image-converter.service';

describe('WasmImageConverterService', () => {
  let service: WasmImageConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasmImageConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
