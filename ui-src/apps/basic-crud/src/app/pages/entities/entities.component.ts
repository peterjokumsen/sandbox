import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesApiService } from '@sandbox/entities-api';
import { BehaviorSubject, catchError, first, map, Observable, of } from 'rxjs';
import { LoggerService } from '@sandbox/logging';
import { ButtonListComponent, FormComponent, FormSchema } from '@pj-sandbox/ui';
import { AccordionConfig, AccordionModule } from 'ngx-bootstrap/accordion';
import { SetEntityPropertiesComponent } from '../../components/set-entity-properties/set-entity-properties.component';

type State = 'wait' | 'loading' | 'done';

@Component({
  selector: 'sandbox-entities',
  standalone: true,
  imports: [
    CommonModule,
    ButtonListComponent,
    AccordionModule,
    SetEntityPropertiesComponent,
    FormComponent,
  ],
  providers: [{ provide: AccordionConfig, useValue: { closeOthers: true } }],
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
})
export class EntitiesComponent {
  private _schemaSubject = new BehaviorSubject<FormSchema | undefined>({
    title: 'Entity',
    properties: {
      value: { type: 'string', label: 'Value' },
    },
  });
  private _showingInputSubject = new BehaviorSubject<boolean>(false);
  private _api = inject(EntitiesApiService);
  private _logger = inject(LoggerService);
  private _getStateSubject = new BehaviorSubject<State>('wait');
  private _getSubject = new BehaviorSubject<unknown>(null);
  private _postStateSubject = new BehaviorSubject<State>('wait');
  private _postSubject = new BehaviorSubject<unknown>(null);
  private _deleteStateSubject = new BehaviorSubject<State>('wait');
  private _deleteSubject = new BehaviorSubject<unknown>(null);

  showingInput$ = this._showingInputSubject.asObservable();
  entitySchema$ = this._schemaSubject.asObservable();
  newEntity: { [key: string]: string } = { value: 'hello' };

  getState$ = this._getStateSubject.asObservable();
  get$ = this._getSubject.asObservable();

  postState$ = this._postStateSubject.asObservable();
  post$ = this._postSubject.asObservable();

  deleteState$ = this._deleteStateSubject.asObservable();
  hasElements$ = this.getState$.pipe(map((state) => state === 'done'));
  elementsToDelete$: Observable<string[]> = this._getSubject
    .asObservable()
    .pipe(
      map((response) => {
        if (
          this.isType<{ resources: Array<object & { id: string }> }>(
            response,
            'resources',
          )
        ) {
          return response.resources.map(({ id }) => id);
        }

        return [];
      }),
    );
  delete$ = this._deleteSubject.asObservable();

  private isType<T>(obj: unknown, prop: keyof T): obj is T {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  updateSchema(schema: FormSchema) {
    this._schemaSubject.next(undefined);
    this._logger.log('Updating schema', { schema });
    this._schemaSubject.next(schema);
  }

  get() {
    this._getStateSubject.next('loading');
    this._getSubject.next(null);
    this._api
      .getAll({ value: 'hello' })
      .pipe(
        first(),
        catchError((error) => {
          this._logger.log('Failed to get entities', { error });
          return of({ message: 'Failed to get value', error });
        }),
      )
      .subscribe((response) => {
        this._getSubject.next(response);
        this._getStateSubject.next('done');
      });
  }

  post() {
    this._postStateSubject.next('loading');
    this._postSubject.next(null);
    this._api
      .createEntity(this.newEntity)
      .pipe(
        first(),
        catchError((error) => {
          this._logger.log('Failed to post entity', { error });
          return of({ message: 'Failed to post value', error });
        }),
      )
      .subscribe((response) => {
        this._postSubject.next(response);
        this._postStateSubject.next('done');
      });
  }

  delete(elementId?: string) {
    if (!elementId) {
      this._deleteStateSubject.next('done');
      this._deleteSubject.next({ message: 'No element to delete received' });
      return;
    }

    this._deleteStateSubject.next('loading');

    this._api
      .deleteEntity(elementId)
      .pipe(
        first(),
        catchError((error) => {
          this._logger.log('Failed to delete entity', { error });
          return of({ message: 'Failed to delete value', error });
        }),
      )
      .subscribe((response) => {
        this._deleteSubject.next(response);
        this._deleteStateSubject.next('done');
        this.get();
      });
  }

  inputOpenChange(isOpen: boolean) {
    this._showingInputSubject.next(isOpen);
  }
}
