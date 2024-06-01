import { IBus } from '@shared/state-bus/IBus';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { AuthStateActions } from '../../actions/auth.action';
import { Select } from '@ngxs/store';
import { AuthBaseState } from '@core/auth';
// import { AuthBaseState } from '@features/auth/states/auth.state';
// import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
// import { PromoterState } from '@features/promoter/_store/states/promoter.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;

  @Select(AuthBaseState.isLoading) loadingAuth$: Observable<boolean>;
  @Select(AuthBaseState.getErrorMessage) errorMessage$: Observable<string>;

  // @Select(WorkspaceState.isLoading)  loadingWorkspaceData$: Observable<boolean>;
  // @Select(PromoterState.isLoading)  loadingPromoterData$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,

    private stateBus: IBus
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.clearAlertMessages();
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.stateBus.excuteAction(
      new AuthStateActions.Login({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      })
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  clearAlertMessages() {
    this.stateBus.excuteAction(new AuthStateActions.ClearErrorMessage());
  }
}
