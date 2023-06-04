import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConfigApiService {
  private _http = inject(HttpClient);

  getConfig() {
    return this._http.get<Config>('api/config');
  }
}
