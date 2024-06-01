import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityManagementRoutingModule } from './community-management-routing.module';
import { CommunityManagementComponent } from './community-management.component';
import { ListComponent } from './list/list.component';
import { InstructorCommunityComponent } from './list/instructor-community/instructor-community.component';
import { StudentCommunityComponent } from './list/student-community/student-community.component';
import { AdminCommunityComponent } from './list/admin-community/admin-community.component';
import { ExploreCommunitiesComponent } from './explore/explore-communities/explore-communities.component';
import { ViewCommuntiyComponent } from './view/view-communtiy/view-communtiy.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CommunityManagementComponent,
    ListComponent,
    InstructorCommunityComponent,
    StudentCommunityComponent,
    AdminCommunityComponent,
    ExploreCommunitiesComponent,
    ViewCommuntiyComponent,
  ],
  imports: [
    CommonModule,
    CommunityManagementRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CommunityManagementModule {}
