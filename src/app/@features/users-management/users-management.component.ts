import { Component, TemplateRef, ViewEncapsulation, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent {
	private modalService = inject(NgbModal);

  openLg(AddUser: TemplateRef<any>) {
		this.modalService.open(AddUser, { size: 'lg' });
	}
}




