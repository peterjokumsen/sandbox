import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EntitiesApiService } from './entities-api.service';
import { LoggingModule } from '@sandbox/logging';

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
