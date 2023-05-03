import { Injectable } from '@angular/core';

@Injectable()
export abstract class LoggerService {
  abstract log(message: string, ...optionalParams: unknown[]): void;
}
