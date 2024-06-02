import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementHttpService } from '../user-management-http.service';
import { NoticeService } from '@shared/services/notice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() mode: 'edit' | 'add';
  @Input() user: any;
  userManagementFormGroup: FormGroup;
  // userId: string;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private userManagemntSercice: UserManagementHttpService,
    private noticService: NoticeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userManagementFormGroup = this.fb.group({
      email: [],
      firstName: [],
      lastName: [],
      userType: [],
      isActive: [],
    });
  }
  openLg(content: any) {
    if (this.mode === 'edit') {
      this.userManagementFormGroup.patchValue({
        ...this.user,
        firstName: this.user.name.split(' ')[0],
        lastName: this.user.name.split(' ')[1],
      });
    }
    this.modalService.open(content, { size: 'lg' }).result.then((x) => {
      if (x === 'save') {
        if (this.mode === 'edit') {
          // this.userManagementFormGroup.value.userId = this.user.id;
          this.user.name =
            this.userManagementFormGroup.value.firstName +
            ' ' +
            this.userManagementFormGroup.value.lastName;
          this.user.userId = this.user.id;

          this.user.userType = this.userManagementFormGroup.controls.userType.value;
          this.user.isActive =
            this.userManagementFormGroup.controls.isActive.value === 'true' ? true : false;

          console.log(this.user);

          this.userManagemntSercice.updateUser(this.user).subscribe(() => {
            this.noticService.successNotice('Success', 'Updated successfully');
            this.userManagemntSercice.getUsers();
          });
        } else if (this.mode === 'add') {
          this.userManagemntSercice.addUser(this.userManagementFormGroup.value).subscribe(() => {
            this.noticService.successNotice('Success', 'Added successfully');
            this.userManagemntSercice.getUsers();
          });
        }
      }
    });
  }
}
