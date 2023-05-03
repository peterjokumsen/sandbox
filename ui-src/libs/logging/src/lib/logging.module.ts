import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { ProductionLoggerService } from './production-logger.service';
import { DebugLoggerService } from './debug-logger.service';

export const provideLogging = (production = true): Provider[] => {
  return [
    production ? ProductionLoggerService : DebugLoggerService,
    {
      provide: LoggerService,
      useExisting: production ? ProductionLoggerService : DebugLoggerService,
    },
  ];
};

@NgModule({
  imports: [CommonModule],
})
export class LoggingModule {
  static forRoot(production = true) {
    return {
      ngModule: LoggingModule,
      providers: [...provideLogging(production)],
    };
  }
}
