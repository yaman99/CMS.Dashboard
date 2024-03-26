import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { ListComponent } from './list/list.component';
import { AdminDashboardComponent } from './list/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './list/student-dashboard/student-dashboard.component';
import { InstructorDashboardComponent } from './list/instructor-dashboard/instructor-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    InstructorDashboardComponent,


  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxsModule.forFeature(),
    SharedModule
  ]
})
export class DashboardModule { }
