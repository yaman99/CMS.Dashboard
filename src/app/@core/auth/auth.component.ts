import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeModeService } from '@core/partials/layout/theme-mode-switcher/theme-mode.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  today: Date = new Date();

  constructor(private modeService: ThemeModeService) {}

  ngOnInit(): void {
    document.body.classList.add('bg-white');
    this.modeService.updateMode('light');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }
}
