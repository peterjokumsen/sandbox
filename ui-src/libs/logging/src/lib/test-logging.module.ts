import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';

const testLogger: LoggerService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  log: (...args: unknown[]): void => {
    // ignored
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trackEvent(event: string, data?: { [p: string]: unknown }): void {
    // ignored
  },
};

export const provideTestLogging = (): Provider[] => {
  return [{ provide: LoggerService, useValue: testLogger }];
};

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [...provideTestLogging()],
})
export class TestLoggingModule {}
