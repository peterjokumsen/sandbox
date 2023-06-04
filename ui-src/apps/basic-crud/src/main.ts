import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, TitleStrategy, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { PageTitleService } from './app/services';
import { environment } from './environments/environment';
import { provideLogging } from '@sandbox/logging';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideApiServices } from '@sandbox/api';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideLogging(environment.production),
    provideApiServices(),
    provideAnimations(),
    importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })),
    { provide: TitleStrategy, useExisting: PageTitleService },
  ],
}).catch((err) => console.error(err));
