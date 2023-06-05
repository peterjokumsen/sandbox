import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EntitiesApiService } from './services';

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class ApiModule {
  static forRoot() {
    return {
      ngModule: ApiModule,
      providers: [EntitiesApiService],
    };
  }
}

export const provideApiServices = () =>
  importProvidersFrom(HttpClientModule, ApiModule.forRoot());
