import { inject, Injectable } from "@angular/core";
import { LoggerService } from "@sandbox/logging";
import { HttpClient, HttpParams } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable()
export class EntitiesApiService {
  private _logger = inject(LoggerService);
  private _http = inject(HttpClient);

  getAll(params?: Record<string, string | number | boolean>) {
    this._logger.log('Getting all entities', { params });
    return this._http.get('/api/entities', { params }).pipe(
      tap((entities) => {
        this._logger.log('Got all entities', { entities, params });
      }),
    );
  }

  createEntity(entity: object) {
    this._logger.log('Creating entity', { entity });
    return this._http.post('/api/entities', entity).pipe(
      tap((createdEntity) => {
        this._logger.log('Created entity', { createdEntity, entity });
      }),
    );
  }
}
