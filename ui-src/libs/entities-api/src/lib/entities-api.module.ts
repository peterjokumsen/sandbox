import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoggingModule } from '@sandbox/logging';
import { EntitiesApiService } from './entities-api.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, LoggingModule],
})
export class EntitiesApiModule {
  static forRoot() {
    return {
      ngModule: EntitiesApiModule,
      providers: [EntitiesApiService],
    };
  }
}

export const provideEntitiesApi = () =>
  importProvidersFrom(HttpClientModule, EntitiesApiModule.forRoot());
