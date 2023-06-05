import { Injectable } from '@angular/core';

@Injectable()
export abstract class LoggerService {
  abstract log(...args: unknown[]): void;
  abstract trackEvent(event: string, data?: { [key: string]: unknown }): void;
}
