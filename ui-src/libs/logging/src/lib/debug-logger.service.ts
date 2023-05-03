import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class DebugLoggerService extends LoggerService {
  log(message: string, ...optionalParams: unknown[]): void {
    console.log(message, ...optionalParams);
  }
}
