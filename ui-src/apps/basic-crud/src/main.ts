import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  TitleStrategy,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { PageTitleService } from './app/services';
import { environment } from './environments/environment';
import { provideLogging } from '@sandbox/logging';
import { provideEntitiesApi } from "@sandbox/entities-api";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideLogging(environment.production),
    provideEntitiesApi(),
    { provide: TitleStrategy, useExisting: PageTitleService },
  ],
}).catch((err) => console.error(err));
