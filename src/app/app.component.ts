import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from '@shared/i18n';
// language list
import { locale as enLang } from '@shared/i18n/vocabs/en';
import { locale as arLang } from '@shared/i18n/vocabs/ar';
import { ThemeModeService } from '@core/partials/layout/theme-mode-switcher/theme-mode.service';

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService
  ) {
    // register translations
    this.translationService.loadTranslations(enLang, arLang);
  }

  ngOnInit() {
    this.modeService.init();
  }
}
