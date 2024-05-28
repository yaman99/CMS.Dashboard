import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-communtiy',
  templateUrl: './view-communtiy.component.html',
  styleUrls: ['./view-communtiy.component.scss']
})
export class ViewCommuntiyComponent {
  private modalService = inject(NgbModal);
	PostToCommunity(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
}
