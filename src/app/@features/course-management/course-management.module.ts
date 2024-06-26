import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseManagementRoutingModule } from './course-management-routing.module';
import { CourseManagementComponent } from './course-management.component';
import { ListComponent } from './list/list.component';
import { InstructorListComponent } from './list/instructor-list/instructor-list.component';
import { StudentListComponent } from './list/student-list/student-list.component';
import { AdminListComponent } from './list/admin-list/admin-list.component';
import { ViewComponent } from './view/view.component';
import { StudentViewComponent } from './view/student-view/student-view.component';
import { AdminViewComponent } from './view/admin-view/admin-view.component';
import { InstructorViewComponent } from './view/instructor-view/instructor-view.component';


@NgModule({
  declarations: [
    CourseManagementComponent,
    ListComponent,
    InstructorListComponent,
    StudentListComponent,
    AdminListComponent,
    ViewComponent,
    StudentViewComponent,
    AdminViewComponent,
    InstructorViewComponent
  ],
  imports: [
    CommonModule,
    CourseManagementRoutingModule,
  ]
})
export class CourseManagementModule { }
