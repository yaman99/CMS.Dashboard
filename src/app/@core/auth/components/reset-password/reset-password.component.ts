import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { AuthStateActions } from '@core/auth/actions/auth.action';
import { SetPasswordRequest } from '@core/auth/models/SetPasswordRequest';
import { AuthBaseState } from '@core/auth/states/auth.state';
import { Select } from '@ngxs/store';
import { IBus } from '@shared/state-bus/IBus';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  @Select(AuthBaseState.getSuccessMessage) successMessage$: Observable<string>
  UpdatePasswordForm: FormGroup;
  constructor(private fb: FormBuilder, private stateBus: IBus, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.initUpdatePasswordForm()
  }
  initUpdatePasswordForm() {
    this.UpdatePasswordForm = this.fb.group(
      {
        newPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'),
          ]),
        ],
        confirmationPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            // Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'),
          ]),
        ],
      },
      { validators: Validators.compose([this.passwordsMatchValidator, this.NotTheSamePassword]) }
    );
  }
  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmationPassword = control.get('confirmationPassword')?.value;

    // Check if the passwords match
    if (newPassword !== confirmationPassword) {
      control.get('confirmationPassword')?.setErrors({ passwordsMatch: true });
      return { passwordsMatch: control.value };
    }

    return null;
  };

  NotTheSamePassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const oldPassword = control.get('oldPassword')?.value;

    // Check if the passwords match
    if (newPassword == oldPassword) {
      control.get('newPassword')?.setErrors({ HaveToChange: true });
      return { HaveToChange: control.value };
    }

    return null;
  }
  checkUpdatePasswordFormValidation() {
    return this.UpdatePasswordForm.valid;
  }
  submit(){
    let model : SetPasswordRequest ={
      password : this.UpdatePasswordForm.controls.password.value,
      passwordConfirmation: this.UpdatePasswordForm.controls.passwordConfirmation.value,
      verificationCode: this.route.snapshot.paramMap.get('token')!
    };
    this.stateBus.excuteAction(new AuthStateActions.SetPassword(model));
  }

}
