import { TestBed } from '@angular/core/testing';

import { DebugLoggerService } from './debug-logger.service';

describe('DebugLoggerService', () => {
  let service: DebugLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebugLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
