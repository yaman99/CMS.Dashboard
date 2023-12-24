import { AuthStateActions } from '../actions/auth.action';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, switchMap } from 'rxjs/operators';
import { AuthBaseState } from '../states/auth.state';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private store: Store, private jwtHelper: JwtHelperService, private router: Router) {}
  canActivate() {
    return this.store.selectOnce(AuthBaseState.getToken).pipe(
      switchMap((token) => {
        if (!token) {
          this.store.dispatch(new AuthStateActions.LogoutRedirect());
          return of(false);
        }
        if (!this.jwtHelper.isTokenExpired()) {
          return of(true);
        } else {
          return this.store.dispatch(new AuthStateActions.RefreshToken()).pipe(map(() => true));
        }
      })
    );
  }
}
