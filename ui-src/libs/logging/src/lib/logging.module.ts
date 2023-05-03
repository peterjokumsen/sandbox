import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { ProductionLoggerService } from './production-logger.service';
import { DebugLoggerService } from './debug-logger.service';

export const provideLogging = (production = true) => {
  return { provide: LoggerService, useClass: production ? ProductionLoggerService : DebugLoggerService };
}

@NgModule({
  imports: [CommonModule],
})
export class LoggingModule {
}
