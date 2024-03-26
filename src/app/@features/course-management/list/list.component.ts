import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  userType:string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userType=this.authService.getUserType();
  }

}
