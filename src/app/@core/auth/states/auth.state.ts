import { NoticeService } from '@shared/services/notice.service';
import { AuthService } from './../services/auth.service';
import { AuthHTTPService } from './../services/auth-http/auth-http.service';
import { LoadingHandler } from './../../../@shared/state-helpers/loading-handler/LoadingHandler';
import { AuthStateModel } from '../models/authStateModel';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthStateActions } from '../actions/auth.action';
import { tap } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
// import { AuthPaths } from '@shared/paths';
import { UserTypes } from '@shared/constants';
import { User } from '../models/user';
import { StateClear, StateReset, StateResetAll } from 'ngxs-reset-plugin';
import { HttpErrorResponse } from '@angular/common/http';
// import { PromoterStateActions } from '@features/promoter/_store/actions/promoter-state.actions';
// import { WorkspaceStateActions } from '@features/workspace/_store/actions/workspace.action';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    accessToken: null,
    refreshToken: null,
    id: null,
    email: null,
    userType: null,
    isLoading: false,
    phone: null,
    punishments: [],
    errorMessage: null,
    successMessage : null
  },
})
@Injectable()
export class AuthBaseState extends LoadingHandler<AuthStateModel> implements NgxsOnInit {
  @Selector()
  static getToken(state: AuthStateModel) {
    return state.accessToken;
  }
  @Selector()
  static getErrorMessage(state: AuthStateModel) {
    return state.errorMessage;
  }

  @Selector()
  static getSuccessMessage(state: AuthStateModel) {
    return state.successMessage;
  }


  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.accessToken;
  }

  @Selector()
  static isAdmin(state: AuthStateModel): boolean {
    return state.userType === UserTypes.Admin;
  }
  @Selector()
  static isPromoter(state: AuthStateModel): boolean {
    return state.userType === UserTypes.Promoter;
  }
  @Selector()
  static isAdvertiser(state: AuthStateModel): boolean {
    return state.userType === UserTypes.Advertiser;
  }

  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static getUserType(state: AuthStateModel): string | null {
    return state.userType;
  }

  @Selector()
  static getPunishments(state: AuthStateModel): string[] | null {
    return state.punishments;
  }

  @Selector()
  static refreshToken(state: AuthStateModel): boolean {
    return !!state.refreshToken;
  }
  @Selector()
  static getUser(state: AuthStateModel): User {
    return {
      email: state.email,
      id: state.id,
      phone: state.phone,
      userType: state.userType,
    };
  }
  /**
   *
   */
  constructor(
    private authHttpService: AuthHTTPService,
    private authService: AuthService,
    private notifiy: NoticeService
  ) {
    super();
  }
  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.patchState({
      errorMessage: null,
    });
  }

  @Action(AuthStateActions.Login)
  onLogin(ctx: StateContext<AuthStateModel>, { payload }: AuthStateActions.Login) {
    this.startLoading(ctx);
    return this.authHttpService.login(payload.email, payload.password).pipe(
      tap({
        next: (res) => {

          ctx.dispatch(new AuthStateActions.LoginSuccess(res));
        },
        error: (err) => {
          ctx.dispatch(new AuthStateActions.LoginFailed(err));
        },
      })
    );
  }

  @Action(AuthStateActions.SignUp)
  onSignup(ctx: StateContext<AuthStateModel>, { payload }: AuthStateActions.SignUp) {
    this.startLoading(ctx);
    return this.authHttpService.signUp(payload).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            successMessage: "AUTH.ALERT.SIGNUP.SUCCESS"
          })
          ctx.dispatch(new Navigate(['/auth/login']));
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(AuthStateActions.Logout)
  onLogout(ctx: StateContext<AuthStateModel>) {
    return this.authHttpService.logout().pipe(
      tap(() => {
        ctx.dispatch(new AuthStateActions.LogoutSuccess());
      })
    );
  }

  @Action(AuthStateActions.LoginFailed)
  onLoginFailed(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isLoading: false,
    });
  }

  @Action(AuthStateActions.LoginSuccess)
  onLoginSuccess(ctx: StateContext<AuthStateModel>, { result }: AuthStateActions.LoginSuccess) {

    const tokenClaims = this.authService.getTokenClaims(result.accessToken!);
    ctx.patchState({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      userType: tokenClaims.userType,
      id: tokenClaims.unique_name,
    });
    ctx.dispatch(new AuthStateActions.LoginRedirect());
  }

  @Action(AuthStateActions.LogoutSuccess)
  onLogoutSuccess(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      accessToken: null,
      refreshToken: null,
      email: null,
      id: null,
      isLoading: false,
      userType: null,
    });
    ctx.dispatch(new AuthStateActions.LogoutRedirect());
  }

  @Action(AuthStateActions.LoginRedirect)
  onLoginRedirect(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    if (state.accessToken !== null) {
      // // console.log(ctx.getState().userType);
      // if(ctx.getState().userType === "admin"){
      // }
      ctx.dispatch(new Navigate(['/dashboard/list']));
      // ctx.dispatch(new AuthStateActions.GetUser());
    }
  }
  @Action(AuthStateActions.LogoutRedirect)
  onLogoutRedirect(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new Navigate(['/auth/login']));
    ctx.dispatch(new StateClear(AuthBaseState));
  }

  @Action(AuthStateActions.RefreshToken)
  onRefreshToken(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authHttpService.refreshToken(state.refreshToken!).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            ...state,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
        },
        error: () => {
          ctx.dispatch(new AuthStateActions.LogoutSuccess());
        },
      })
    );
  }
  @Action(AuthStateActions.ChangePassword)
  changePassword(ctx: StateContext<AuthStateModel>, { payload }: AuthStateActions.ChangePassword) {
    return this.authHttpService.changePassword(payload).pipe(
      tap({
        next: () => this.notifiy.successNotice('AUTH.ALERT.PASSWORD.SUCCESS'),
      })
    );
  }
  @Action(AuthStateActions.UpdateEmail)
  updateEmail(ctx: StateContext<AuthStateModel>, { payload }: AuthStateActions.UpdateEmail) {
    return this.authHttpService.updateEmail(payload).pipe(
      tap({
        next: () => {
          ctx.patchState({
            email: payload.email

          })
          this.notifiy.successNotice('Email Updated Successfully, check your email to verify account');
        },
      })
    );
  }
  @Action(AuthStateActions.UpdatePhoneNumber)
  updateUser(ctx: StateContext<AuthStateModel>, { payload }: AuthStateActions.UpdatePhoneNumber) {
    return this.authHttpService.updatePhone(payload).pipe(
      tap({
        next: () => {
          ctx.patchState(payload);
          this.notifiy.successNotice('AUTH.ALERT.UPDATE.SUCCESS');
        },
      })
    );
  }
  @Action(AuthStateActions.GetUser)
  getUser(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authHttpService.getUserByToken().pipe(
      tap({
        next: (data) => {
          ctx.patchState({
            ...state,
            phone: data.phone,
            email: data.email,
            userType: data.userType,
          });
          // if (state.userType === UserTypes.Promoter) {
          //   ctx.dispatch(new PromoterStateActions.Get(state.id!, true));
          // } else if (state.userType === UserTypes.Advertiser) {
          //   ctx.dispatch(new WorkspaceStateActions.Get(state.id!, true));
          // }
        },
        finalize: () => {
          this.stopLoading(ctx);
        },
      })
    );
  }
  @Action(AuthStateActions.SetupQuickAccount)
  setupQuickAccount(
    ctx: StateContext<AuthStateModel>,
    { authCode }: AuthStateActions.SetupQuickAccount
  ) {
    return this.authHttpService.setupQuickAccount(authCode);
  }

  @Action(AuthStateActions.SetPassword)
  setPassword(ctx: StateContext<AuthStateModel>, { payload }: AuthStateActions.SetPassword) {
    this.startLoading(ctx);
    return this.authHttpService.setPassword(payload).pipe(
      tap({
        next: () => {
          this.notifiy.successNotice('AUTH.ALERT.SET_PASSWORD.SUCCESS');
          // ctx.dispatch(new Navigate(AuthPaths.LoginPathComponents));
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(AuthStateActions.ResendEmail)
  resendEmail(ctx: StateContext<AuthStateModel>, { email }: AuthStateActions.ResendEmail) {
    this.startLoading(ctx);
    return this.authHttpService.resendEmail(email).pipe(
      tap({
        next: () => {
          this.notifiy.successNotice('AUTH.ALERT.RESNED_EMAIL.SUCCESS');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(AuthStateActions.ResetPassword)
  resetPassword(ctx: StateContext<AuthStateModel>, {email}: AuthStateActions.ResetPassword){
    this.startLoading(ctx);
    return this.authHttpService.resetPassword(email).pipe(
      tap({
        next: () => {
          ctx.patchState({
            successMessage: "AUTH.ALERT.RESNED_EMAIL.SUCCESS"

          })
        },

        error: (err: HttpErrorResponse) =>{
          ctx.patchState({
            errorMessage: err.message
          })
        } ,
        finalize : () => this.stopLoading(ctx)
      })
    )
  }
  @Action(AuthStateActions.SetErrorMessage)
  onSetErrorMessage(
    ctx: StateContext<AuthStateModel>,
    { message }: AuthStateActions.SetErrorMessage
  ) {
    ctx.patchState({
      errorMessage: message,
    });
  }
  @Action(AuthStateActions.ClearSuccessMessage)
  onClearSuccessMessage(ctx: StateContext<AuthStateModel>){

    ctx.patchState({
      successMessage: null
    })
  }
  @Action(AuthStateActions.ClearErrorMessage)
  onClearErrorMessage(ctx: StateContext<AuthStateModel>){
    ctx.patchState({
      errorMessage: null
    })
  }
}
