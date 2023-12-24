import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LoggedInGuard } from '@core/auth';

export const routes: Routes = [
  {
    // canActivate: [LoggedInGuard],
    path: 'auth',
    loadChildren: () =>
      import('@core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('@core/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./@core/layout/layout.module').then((m) => m.LayoutModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
