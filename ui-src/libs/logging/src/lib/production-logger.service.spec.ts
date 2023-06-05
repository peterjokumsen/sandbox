import { TestBed } from '@angular/core/testing';
import { ProductionLoggerService } from './production-logger.service';
import { AnalyticsLoggerService } from './analytics-logger.service';

describe('ProductionLoggerService', () => {
  let service: ProductionLoggerService;
  let analyticsSpy: jest.Mocked<AnalyticsLoggerService>;

  beforeEach(() => {
    analyticsSpy = {
      trackEvent: jest.fn(),
    } as Partial<AnalyticsLoggerService> as jest.Mocked<AnalyticsLoggerService>;

    TestBed.configureTestingModule({
      providers: [
        { provide: AnalyticsLoggerService, useValue: analyticsSpy },
        ProductionLoggerService,
      ],
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
