import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class DebugLoggerService extends LoggerService {
  log(...args: unknown[]): void {
    console.log(...args);
  }

  trackEvent(event: string, data?: { [p: string]: unknown }): void {
    console.log(event, data);
  }
}
