import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  userType:string;
    constructor(private authService: AuthService) { }
    ngOnInit(): void {
      this.userType=this.authService.getUserType();
    }
  
  }
