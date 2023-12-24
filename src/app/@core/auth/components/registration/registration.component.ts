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
  accountCreated = new BehaviorSubject<boolean>(false);
  @Select(AuthBaseState.getSuccessMessage) successMessage$: Observable<string>
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(private fb: FormBuilder, private stateBus: IBus, private route: ActivatedRoute) {
    // redirect to home if already logged in
    this.selectedUserType = this.route.snapshot.queryParams['type'] ?? 'promoter';
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
        firstName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        lastName: [
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
        userType: [this.selectedUserType ?? '', Validators.required],
      },
      {
        validators: MatchPassword(),
      }
    );
  }
  selectUserType(userType: string) {
    this.selectedUserType = userType;

  }

  submit() {
    let model: SignUpModel = {
      email: this.f.email.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      password: this.f.password.value,
      confirmPassword: this.f.cPassword.value,
      userType: this.f.userType.value,
    };
    const sub = this.stateBus.excuteAction(new AuthStateActions.SignUp(model)).subscribe({
      next: () => {
        this.accountCreated.next(true);
      },
    });
    this.unsubscribe.push(sub);
  }
  clearAlertMessages(){
    this.stateBus.excuteAction(new AuthStateActions.ClearSuccessMessage());
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
