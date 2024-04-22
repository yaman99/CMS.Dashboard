import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    UsersManagementComponent,
    ViewComponent,
    ListComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    UsersManagementRoutingModule,
    FormsModule
  ]
})
export class UsersManagementModule { }
