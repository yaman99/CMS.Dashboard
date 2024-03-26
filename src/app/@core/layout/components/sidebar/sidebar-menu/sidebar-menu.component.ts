import { Component, OnInit } from '@angular/core';
import { AuthBaseState, AuthService, AuthStateActions } from '@core/auth';
import { AuthStateModel } from '@core/auth/models/authStateModel';
import { Select } from '@ngxs/store';
import { IBus } from '@shared/state-bus/IBus';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
userType:string;
  constructor(private authService: AuthService) { }
  @Select(AuthBaseState.isAdvertiser) isAdvertiser$:Observable<boolean>;
  @Select(AuthBaseState.isPromoter) isPromoter$:Observable<boolean>;

  ngOnInit(): void {
    this.userType=this.authService.getUserType();
  }

}
