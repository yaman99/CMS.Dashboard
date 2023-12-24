import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { IBus } from '@shared/state-bus/IBus';
import {
  AffiliateCount,
  ConversionsStatusCount,
} from '@shared/models/dashboard/workspaceDashboard';

@Component({
  selector: 'app-workspace-dashboard',
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.scss'],
})
export class WorkspaceDashboardComponent  {
  constructor(private stateBus: IBus) {}

}
