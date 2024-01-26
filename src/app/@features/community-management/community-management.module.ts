import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityManagementRoutingModule } from './community-management-routing.module';
import { CommunityManagementComponent } from './community-management.component';


@NgModule({
  declarations: [
    CommunityManagementComponent
  ],
  imports: [
    CommonModule,
    CommunityManagementRoutingModule
  ]
})
export class CommunityManagementModule { }
