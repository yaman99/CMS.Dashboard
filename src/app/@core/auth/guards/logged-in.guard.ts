import { AuthStateActions } from '../../auth/actions/auth.action';
import { IBus } from '@shared/state-bus/IBus';
import { AuthService } from '../index';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
// import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthBaseState } from '../states/auth.state';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard {
  constructor(private router: Router, private stateBus: IBus) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.stateBus.getSnapshot(
      AuthBaseState.isAuthenticated
    );

    if (isAuthenticated) {
      this.stateBus.excuteAction(new AuthStateActions.LoginRedirect());
      return false;
    }
    return true;
  }
}
