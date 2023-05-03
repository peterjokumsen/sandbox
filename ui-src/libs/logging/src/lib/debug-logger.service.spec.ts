import { TestBed } from '@angular/core/testing';
import { DebugLoggerService } from './debug-logger.service';

describe('DebugLoggerService', () => {
  let service: DebugLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebugLoggerService],
    });
    service = TestBed.inject(DebugLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log to console', () => {
    const logSpy = jest.spyOn(console, 'log');
    service.log('test');
    expect(logSpy).toHaveBeenCalledWith('test');
  });
});
