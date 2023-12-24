import { Routes } from '@angular/router';
// import { IntegrationExpiredGuard } from '@core/guards/integration-expired.guard';

const Routing: Routes = [
  {
    path: 'dashboard',
    // canActivate: [IntegrationExpiredGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
