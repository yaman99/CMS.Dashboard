import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { CommunityManagementComponent } from './community-management/community-management.component';
import { ProfileInfoComponent } from './settings/components/profile-info/profile-info.component';
import { AccountSettingsComponent } from './settings/components/account-settings/account-settings.component';
import { SocialMediaAccountsComponent } from './settings/components/social-media-accounts/social-media-accounts.component';
import { UsersSettingsComponent } from './settings/users-settings/users-settings.component';
// import { IntegrationExpiredGuard } from '@core/guards/integration-expired.guard';

const Routing: Routes = [
  {
    path: 'dashboard',
    // canActivate: [IntegrationExpiredGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users-management',
    loadChildren: () => import('./users-management/users-management.module').then((m) => m.UsersManagementModule)
  },


  {
    path: 'course-management',
    component: CourseManagementComponent,

  },
  {
    path: 'content-management',
    component: ContentManagementComponent,

  },
  {
    path: 'community-management',
    component: CommunityManagementComponent,

  },
  {
    path: 'users-settings',
    component: UsersSettingsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children:[
      {
        path: '',
        component:ProfileInfoComponent,
      },
      {
        path: 'profile-info',
        component:ProfileInfoComponent,
      },
      {
        path: 'account-settings',
        component:AccountSettingsComponent,
      },
      {
        path: 'social-accounts',
        component:SocialMediaAccountsComponent,
      },

    ]
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
