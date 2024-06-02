import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseManagementRoutingModule } from './course-management-routing.module';
import { CourseManagementComponent } from './course-management.component';
import { ListComponent } from './list/list.component';
import { InstructorListComponent } from './list/instructor-list/instructor-list.component';
import { StudentListComponent } from './list/student-list/student-list.component';
import { AdminListComponent } from './list/admin-list/admin-list.component';
import { ViewComponent } from './view/view.component';
import { AddCourseDetailsComponent } from './view/add-course-details/add-course-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddLessonModalComponent } from './view/add-course-details/add-lesson-modal/add-lesson-modal.component';
import { LibraryComponent } from './library/library.component';

@NgModule({
  declarations: [
    CourseManagementComponent,
    ListComponent,
    InstructorListComponent,
    StudentListComponent,
    AdminListComponent,
    ViewComponent,
    AddCourseDetailsComponent,
    AddLessonModalComponent,
    LibraryComponent
  ],
  imports: [CommonModule, CourseManagementRoutingModule, ReactiveFormsModule],
})
export class CourseManagementModule {}
