import { TestBed } from '@angular/core/testing';

import { ProductionLoggerService } from './production-logger.service';

describe('ProductionLoggerService', () => {
  let service: ProductionLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
