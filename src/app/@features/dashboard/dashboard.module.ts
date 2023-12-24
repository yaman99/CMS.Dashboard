import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PromoterDashboardComponent } from './components/promoter-dashboard/promoter-dashboard.component';
import { WorkspaceDashboardComponent } from './components/workspace-dashboard/workspace-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [
    DashboardComponent,
    PromoterDashboardComponent,
    WorkspaceDashboardComponent,
    AdminDashboardComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxsModule.forFeature(),
    SharedModule
  ]
})
export class DashboardModule { }
