import { TestBed } from '@angular/core/testing';

import { TiposexoService } from './tiposexo.service';

describe('TiposexoService', () => {
  let service: TiposexoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposexoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
