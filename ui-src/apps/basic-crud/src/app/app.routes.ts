import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    data: { title: 'Home' },
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (m) => m.LandingComponent,
      ),
  },
  {
    path: 'entities',
    data: { title: 'Entities' },
    loadComponent: () =>
      import('./pages/entities/entities.component').then(
        (m) => m.EntitiesComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    data: { title: 'Not Found' },
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
