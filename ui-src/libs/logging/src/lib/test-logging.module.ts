import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';

const testLogger: LoggerService = {
  log: (): void => {
    // ignored
  },
  trackEvent(): void {
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
