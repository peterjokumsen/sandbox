import { inject, Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { AnalyticsLoggerService } from './analytics-logger.service';

@Injectable()
export class ProductionLoggerService extends LoggerService {
  private _analytics = inject(AnalyticsLoggerService);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override log(...args: unknown[]): void {
    // ignored
  }

  override trackEvent(event: string, data?: { [p: string]: unknown }) {
    this._analytics.trackEven(event, data);
  }
}
