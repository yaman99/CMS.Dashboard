import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangePasswordModel } from '@core/auth/models/changePassword.model';
import { AuthHTTPService } from '@core/auth/services/auth-http';
import { UserManagementHttpService } from '@features/users-management/user-management-http.service';
import { NoticeService } from '@shared/services/notice.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  userManagementFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  user: any;
  constructor(
    private fb: FormBuilder,
    private userManagemntSercice: UserManagementHttpService,
    private noticService: NoticeService,
    private authHttpService: AuthHTTPService
  ) {}
  ngOnInit(): void {
    // this.userManagemntSercice.getUser().subscribe((res) => {
    //   this.user = res.data;
    //   console.log(this.user.email);
    // });
    this.passwordFormGroup = this.fb.group({
      currentPassword: [],
      newPassword: [],
      passwordConfirmation: [],
    });
    this.userManagementFormGroup = this.fb.group({
      email: [],
      firstName: [],
      lastName: [],
      phone: [],
    });
    this.userManagemntSercice.getUser().subscribe((res) => {
      this.user = res.data;
      this.userManagementFormGroup.patchValue({
        email: this.user.email,
        firstName: this.user.name.split(' ')[0],
        lastName: this.user.name.split(' ')[1],
        phone: this.user.phone,
      });
    });
  }

  updateAccount() {
    this.user.name =
      this.userManagementFormGroup.value.firstName +
      ' ' +
      this.userManagementFormGroup.value.lastName;
    this.user.userId = this.user.id;
    this.user.phone = this.userManagementFormGroup.value.phone;

    this.userManagemntSercice.updateUser(this.user).subscribe(() => {
      this.noticService.successNotice('Success', 'Updated successfully');
    });
  }

  updatePassword() {
    let model: ChangePasswordModel = {
      currentPassword: this.passwordFormGroup.controls.currentPassword.value,
      newPassword: this.passwordFormGroup.controls.newPassword.value,
      passwordConfirmation: this.passwordFormGroup.controls.passwordConfirmation.value,
    };
    this.authHttpService.changePassword(model).subscribe(() => {
      this.noticService.successNotice('Password Changed Successfully');
    });
  }
}
