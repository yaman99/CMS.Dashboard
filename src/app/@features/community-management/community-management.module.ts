import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityManagementRoutingModule } from './community-management-routing.module';
import { CommunityManagementComponent } from './community-management.component';
import { ListComponent } from './list/list.component';
import { InstructorCommunityComponent } from './list/instructor-community/instructor-community.component';
import { StudentCommunityComponent } from './list/student-community/student-community.component';
import { AdminCommunityComponent } from './list/admin-community/admin-community.component';


@NgModule({
  declarations: [
    CommunityManagementComponent,
    ListComponent,
    InstructorCommunityComponent,
    StudentCommunityComponent,
    AdminCommunityComponent
  ],
  imports: [
    CommonModule,
    CommunityManagementRoutingModule
  ]
})
export class CommunityManagementModule { }
