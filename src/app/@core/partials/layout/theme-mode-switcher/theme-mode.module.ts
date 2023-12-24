import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ThemeModeSwitcherComponent } from './theme-mode-switcher.component';
import { LayoutSharedModule } from '../../../shared/sharedlayout.module';

@NgModule({
  declarations: [ThemeModeSwitcherComponent],
  imports: [CommonModule, InlineSVGModule, LayoutSharedModule],
  exports: [ThemeModeSwitcherComponent],
})
export class ThemeModeModule {}
