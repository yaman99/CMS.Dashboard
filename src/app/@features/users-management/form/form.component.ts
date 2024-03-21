import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() mode: 'edit' | 'add';
  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then(x =>{
      console.log(x);
      if(this.mode === 'edit'){
        // send data to https://localhost:4200/api/updateUser
      }else if(this.mode === 'add'){
        // send data to https://localhost:4200/api/addNewUser
      }
    });
  }
}
