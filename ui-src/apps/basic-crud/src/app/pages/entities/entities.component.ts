import { Component, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { EntitiesApiService } from "@sandbox/entities-api";
import { BehaviorSubject, catchError, first, of } from "rxjs";
import { LoggerService } from "@sandbox/logging";

@Component({
  selector: 'sandbox-entities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
})
export class EntitiesComponent {
  private _api = inject(EntitiesApiService);
  private _logger = inject(LoggerService);
  private _getStateSubject = new BehaviorSubject<'wait' | 'loading' | 'done'>('wait');
  private _getSubject = new BehaviorSubject<unknown>(null);

  getState$ = this._getStateSubject.asObservable();
  get$ = this._getSubject.asObservable();

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
}
