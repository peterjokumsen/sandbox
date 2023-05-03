import { TestBed } from '@angular/core/testing';
import { ProductionLoggerService } from './production-logger.service';

describe('ProductionLoggerService', () => {
  let service: ProductionLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductionLoggerService],
    });
    service = TestBed.inject(ProductionLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not log to console', () => {
    const logSpy = jest.spyOn(console, 'log');
    service.log('test');
    expect(logSpy).not.toHaveBeenCalled();
  });
});
