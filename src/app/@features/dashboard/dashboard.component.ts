import { User } from './../../@core/auth/models/user';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AuthBaseState } from '@core/auth';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // @Select(AuthBaseState.isAdvertiser) isAdvertiser$: Observable<boolean>;
  // @Select(AuthBaseState.isPromoter) isPromoter$: Observable<boolean>;
}
