import { Component, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { EntitiesApiService } from "@sandbox/entities-api";
import { BehaviorSubject, catchError, first, map, Observable, of } from 'rxjs';
import { LoggerService } from "@sandbox/logging";
import { ButtonListComponent } from '@pj-sandbox/ui';

type State = 'wait' | 'loading' | 'done';

@Component({
  selector: 'sandbox-entities',
  standalone: true,
  imports: [ CommonModule, ButtonListComponent ],
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
})
export class EntitiesComponent {
  private _api = inject(EntitiesApiService);
  private _logger = inject(LoggerService);
  private _getStateSubject = new BehaviorSubject<State>('wait');
  private _getSubject = new BehaviorSubject<unknown>(null);
  private _postStateSubject = new BehaviorSubject<State>('wait');
  private _postSubject = new BehaviorSubject<unknown>(null);
  private _deleteStateSubject = new BehaviorSubject<State>('wait');
  private _deleteSubject = new BehaviorSubject<unknown>(null);

  getState$ = this._getStateSubject.asObservable();
  get$ = this._getSubject.asObservable();

  postState$ = this._postStateSubject.asObservable();
  post$ = this._postSubject.asObservable();

  deleteState$ = this._deleteStateSubject.asObservable();
  hasElements$ = this.getState$.pipe(map((state) => state === 'done'));
  elementsToDelete$: Observable<unknown[]> = this._getSubject.asObservable().pipe(
    map((response) => {
      if (this.isType<{ resources: unknown[] }>(response, 'resources')) {
        return response.resources;
      }

      return [];
    }),
  );
  delete$ = this._deleteSubject.asObservable();

  private isType<T>(obj: unknown, prop: keyof T): obj is T {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  get() {
    this._getStateSubject.next('loading');
    this._getSubject.next(null);
    this._api.getAll({ value: 'hello' }).pipe(
      first(),
      catchError((error) => {
        this._logger.log('Failed to get entities', { error });
        return of({ message: 'Failed to get value', error });
      }),
    ).subscribe((response) => {
      this._getSubject.next(response);
      this._getStateSubject.next('done');
    });
  }

  post() {
    this._postStateSubject.next('loading');
    this._postSubject.next(null);
    this._api.createEntity({ value: 'hello' }).pipe(
      first(),
      catchError((error) => {
        this._logger.log('Failed to post entity', { error });
        return of({ message: 'Failed to post value', error });
      }),
    ).subscribe((response) => {
      this._postSubject.next(response);
      this._postStateSubject.next('done');
    });
  }

  delete(element?: unknown) {
    if (!this.isType<{ id: string }>(element, 'id')) {
      this._logger.log('Failed to delete entity', { error: 'Please pass an id on the query string' });
      return;
    }

    this._deleteStateSubject.next('loading');

    this._api.deleteEntity(element.id).pipe(
      first(),
      catchError((error) => {
        this._logger.log('Failed to delete entity', { error });
        return of({ message: 'Failed to delete value', error });
      }),
    ).subscribe((response) => {
      this._deleteSubject.next(response);
      this._deleteStateSubject.next('done');
      this.get();
    });
  }
}
