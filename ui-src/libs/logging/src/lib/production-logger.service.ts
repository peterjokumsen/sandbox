import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class ProductionLoggerService extends LoggerService {
  log(..._: unknown[]): void {
    // ignored
  }
}
