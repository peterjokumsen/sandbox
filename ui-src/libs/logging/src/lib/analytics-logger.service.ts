import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsLoggerService {
  private _events: Array<{ name: string; properties?: { [key: string]: unknown } }> = [];
  appInsights?: ApplicationInsights;

  constructor(http: HttpClient) {
    http.get<{ insightsConnection: string }>('/api/config').pipe(
      catchError(() => {
        return [{ insightsConnection: '' }];
      }),
    ).subscribe((config) => {
      if (!config.insightsConnection) {
        return;
      }

      this.appInsights = new ApplicationInsights({
        config: {
          connectionString: config.insightsConnection,
          enableAutoRouteTracking: true,
          enableCorsCorrelation: true,
        },
      });

      this.appInsights.loadAppInsights();

      while (this._events.length !== 0) {
        const event = this._events.pop();
        if (event) {
          this.appInsights.trackEvent(event);
        }
      }
    });
  }

  trackEven(event: string, data?: { [key: string]: unknown }) {
    if (!this.appInsights) {
      this._events.push({ name: event, properties: data });
      return;
    }

    this.appInsights.trackEvent({ name: event, properties: data });
  }
}
