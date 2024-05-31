import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseManagementComponent } from './course-management.component';
import { StudentListComponent } from './list/student-list/student-list.component';
import { ListComponent } from '@features/course-management/list/list.component';
import { ViewComponent } from './view/view.component';
import { AddCourseDetailsComponent } from './view/add-course-details/add-course-details.component';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  {
    path: '',
    component: CourseManagementComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'list/:id',
        component: ViewComponent,
        data: {
          source: 'list',
        },
      },
      {
        path: 'AddDetails/:id',
        component: AddCourseDetailsComponent,
      },
      {
        path: 'library',
        component: LibraryComponent,
      },
      {
        path: 'library/:id',
        component: ViewComponent,
        data: {
          source: 'library',
        },
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseManagementRoutingModule {}
