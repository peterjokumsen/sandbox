import { Component, inject, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageTitleService } from './services';
import { AppConfigService } from './app-config';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'sandbox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _router = inject(Router);
  private _titleService = inject(PageTitleService);
  private _config = inject(AppConfigService);

  envValue: string | undefined = 'not set';
  title$ = this._titleService.title$;

  routes: Array<{ path: string; title: string }> = [];

  private isProperPage(
    route: Route,
  ): route is Route & { data: { title: string } } {
    return route.path !== '**' && !!route.data && !!route.data['title'];
  }

  ngOnInit() {
    this.envValue = this._config.settings?.value;
    console.log('AppComponent: ', this.envValue);
    for (const route of this._router.config) {
      if (!this.isProperPage(route)) continue;

      this.routes.push({
        path: `/${route.path}`,
        title: route.data.title,
      });
    }
  }

  resetEnv() {
    this.envValue = this._config.settings?.value;
  }
}
