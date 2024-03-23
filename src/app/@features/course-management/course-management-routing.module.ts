import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseManagementComponent } from './course-management.component';
import { StudentListComponent } from './list/student-list/student-list.component';

const routes: Routes = [
  {
    path: '',
    component: CourseManagementComponent,
    children:[
      {
        path:"student",
        component:StudentListComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseManagementRoutingModule { }
