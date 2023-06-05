import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { ProductionLoggerService } from './production-logger.service';
import { DebugLoggerService } from './debug-logger.service';
import { HttpClientModule } from '@angular/common/http';

export const provideLogging = (production = true) => importProvidersFrom(HttpClientModule, LoggingModule.forRoot(production));

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class LoggingModule {
  static forRoot(production = true) {
    return {
      ngModule: LoggingModule,
      providers: [
        production ? ProductionLoggerService : DebugLoggerService,
        {
          provide: LoggerService,
          useExisting: production ? ProductionLoggerService : DebugLoggerService,
        },
      ],
    };
  }
}
