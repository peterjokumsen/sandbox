import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@pj-sandbox/lazy/landing').then((m) => m.LazyLandingComponent),
  },
];
