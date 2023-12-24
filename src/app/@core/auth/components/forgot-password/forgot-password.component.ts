import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IBus } from '@shared/state-bus/IBus';
import { AuthStateActions } from '@core/auth/actions/auth.action';
import { Select } from '@ngxs/store';
import { AuthBaseState } from '@core/auth/states/auth.state';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;

  isLoading$: Observable<boolean>;
  @Select(AuthBaseState.getSuccessMessage) successMessage$: Observable<string>
  @Select(AuthBaseState.getErrorMessage) errorMessage$: Observable<string>
  @Select(AuthBaseState.isLoading) isLoading : Observable<boolean>



  successMessage: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private fb: FormBuilder, private stateBus: IBus) { }

  ngOnInit(): void {
    this.initForm();
    this.clearAlertMessages()
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  validateForm() {
    return this.forgotPasswordForm.valid;
  }
  submit() {
    const email = this.forgotPasswordForm.controls.email.value
    if (this.validateForm()) {
      this.stateBus.excuteAction(new AuthStateActions.ResetPassword(email))
    }

  }
  clearAlertMessages(){
    this.stateBus.excuteAction(new AuthStateActions.ClearErrorMessage());
    this.stateBus.excuteAction(new AuthStateActions.ClearSuccessMessage());

  }

}
