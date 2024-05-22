import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { CommunityManagementComponent } from './community-management/community-management.component';
import { ExploreCommunitiesComponent } from './community-management/explore/explore-communities/explore-communities.component';
// import { IntegrationExpiredGuard } from '@core/guards/integration-expired.guard';

const Routing: Routes = [
  {
    path: 'dashboard',
    // canActivate: [IntegrationExpiredGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users-management/users-management.module').then((m) => m.UsersManagementModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./course-management/course-management.module').then((m) => m.CourseManagementModule)
  },
  {
    path: 'community',
    loadChildren: () => import('./community-management/community-management.module').then((m) => m.CommunityManagementModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule)
  },
  {
    path: 'courses-library',
    loadChildren: () => import('./courses-library/courses-library.module').then((m) => m.CoursesLibraryModule)
  },
  {
    path: 'explore-communities',
    component: ExploreCommunitiesComponent,
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
