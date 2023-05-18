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
import { provideEntitiesApi } from '@sandbox/entities-api';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideLogging(environment.production),
    provideEntitiesApi(),
    provideAnimations(),
    { provide: TitleStrategy, useExisting: PageTitleService },
  ],
}).catch((err) => console.error(err));
