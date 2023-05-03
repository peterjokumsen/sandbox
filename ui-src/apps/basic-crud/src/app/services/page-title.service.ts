import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { LoggerService } from '@sandbox/logging';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService extends TitleStrategy {
  private _title = inject(Title);
  private _logger = inject(LoggerService);
  private _currentTitleSubject = new BehaviorSubject('');

  title$ = this._currentTitleSubject
    .asObservable()
    .pipe(
      tap((title) => this._logger.log('PageTitleService.title$', { title })),
    );

  private getTitle(root: ActivatedRouteSnapshot): string {
    if (root.data && root.data['title']) return root.data['title'];

    if (root.children && root.children.length) {
      return this.getTitle(root.children[0]);
    }

    return '';
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.getTitle(snapshot.root);
    this._logger.log('PageTitleService.updateTitle', { snapshot, title });
    this._title.setTitle(title);
    this._currentTitleSubject.next(title);
  }
}
