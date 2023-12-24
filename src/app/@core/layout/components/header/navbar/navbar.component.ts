import { Component, Input, OnInit } from '@angular/core';
import { AuthStateActions } from '@core/auth';
import { IBus } from '@shared/state-bus/IBus';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;

  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string = 'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  userAvatarClass: string = 'symbol-35px symbol-md-40px';
  btnIconClass: string = 'fs-2 fs-md-1';

  constructor(private stateBus:IBus) {}

  ngOnInit(): void {}
  logout() {
    // this.auth.logout();
    // document.location.reload();
    this.stateBus.excuteAction(new AuthStateActions.Logout());
  }
}
