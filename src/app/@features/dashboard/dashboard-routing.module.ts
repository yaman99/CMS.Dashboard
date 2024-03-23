import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UsersManagementComponent } from '@features/users-management/users-management.component';
import { CourseManagementComponent } from '@features/course-management/course-management.component';
import { CommunityManagementComponent } from '@features/community-management/community-management.component';
import { SettingsComponent } from '@features/settings/settings.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
