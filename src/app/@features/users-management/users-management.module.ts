import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { ViewUserComponent } from './view-user/view-user.component';


@NgModule({
  declarations: [
    UsersManagementComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    UsersManagementRoutingModule,
    FormsModule
  ]
})
export class UsersManagementModule { }
