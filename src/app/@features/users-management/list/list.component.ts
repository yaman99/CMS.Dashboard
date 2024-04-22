import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
import { AuthService } from '@core/auth';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  userType:string;
    constructor(private authService: AuthService) { }
    ngOnInit(): void {
      this.userType=this.authService.getUserType();
    }
  
  }
  
