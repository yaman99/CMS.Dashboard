import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [
    DashboardComponent,


  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxsModule.forFeature(),
    SharedModule
  ]
})
export class DashboardModule { }
