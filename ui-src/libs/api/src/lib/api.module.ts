import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConfigApiService, EntitiesApiService } from './services';

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class ApiModule {
  static forRoot() {
    return {
      ngModule: ApiModule,
      providers: [
        EntitiesApiService,
        ConfigApiService,
      ],
    };
  }
}

export const provideApiServices = () =>
  importProvidersFrom(HttpClientModule, ApiModule.forRoot());
