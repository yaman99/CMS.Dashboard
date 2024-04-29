import { AuthStateActions } from '../../actions/auth.action';
import { IBus } from '@shared/state-bus/IBus';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatchPassword } from './confirm-password.validator';
import { first } from 'rxjs/operators';
import { AuthBaseState } from '../../states/auth.state';
import { SignUpModel } from '../../models/signUp.model';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  // hasError: boolean;
  isLoading$: Observable<boolean>;
  selectedUserType: string;
  @Select(AuthBaseState.getSuccessMessage) successMessage$: Observable<string>
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(private fb: FormBuilder, private stateBus: IBus, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initForm();
    this.isLoading$ = this.stateBus.getState<boolean>(AuthBaseState.isLoading);
    this.clearAlertMessages()
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
            Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        isCheckBoxChecked: [false, Validators.requiredTrue],

      },
      {
        validators: MatchPassword(),
      }
    );
  }
  selectUserType(userType: string) {
    this.selectedUserType = userType;
    console.log(this.selectedUserType);

  }

  submit() {
    let model: SignUpModel = {
      email: this.f.email.value,
      name: this.f.name.value,
      password: this.f.password.value,
      confirmPassword: this.f.cPassword.value,
      userType: this.selectedUserType,
    };
    this.stateBus.excuteAction(new AuthStateActions.SignUp(model));

  }
  clearAlertMessages(){
    this.stateBus.excuteAction(new AuthStateActions.ClearSuccessMessage());
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
