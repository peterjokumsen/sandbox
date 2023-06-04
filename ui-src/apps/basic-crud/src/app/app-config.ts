import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface AppConfig {
  env: {
    name: string;
  };
  value: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  settings?: AppConfig;

  constructor(private _http: HttpClient) {
    const jsonFile = `assets/config/config.${environment.env}.json`;
    this._http.get<AppConfig>(jsonFile).subscribe((response) => {
      console.log('AppConfigService: ', response);
      this.settings = response;
    });
  }
}
