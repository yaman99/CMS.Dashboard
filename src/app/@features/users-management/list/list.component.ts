import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
import { AuthService } from '@core/auth';
import { UserManagementHttpService } from '../user-management-http.service';
import { BehaviorSubject } from 'rxjs';
import { NoticeService } from '@shared/services/notice.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  userType: string;
  users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private authService: AuthService,
    private userManagemntSercice: UserManagementHttpService,
    private noticService: NoticeService
  ) {}
  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    this.userManagemntSercice.getUsers().subscribe((data) => {
    this.users.next(data);
    });
  }

  deleteUser(userId: any) {
    this.userManagemntSercice.deleteUser(userId).subscribe(() => {
      this.noticService.successNotice('Success', 'Deleted successfully');
      this.userManagemntSercice.getUsers().subscribe((data) => {
        this.users.next(data);
      });
    });
  }
}
