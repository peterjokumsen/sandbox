import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class ProductionLoggerService extends LoggerService {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  log(message: string, ...optionalParams: unknown[]): void {
    // ignored
  }
}
