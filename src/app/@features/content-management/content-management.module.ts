import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentManagementRoutingModule } from './content-management-routing.module';
import { ContentManagementComponent } from './content-management.component';


@NgModule({
  declarations: [
    ContentManagementComponent
  ],
  imports: [
    CommonModule,
    ContentManagementRoutingModule
  ]
})
export class ContentManagementModule { }
