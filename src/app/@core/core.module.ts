import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { checkIfLoaded } from './guards/loadedModule.guard';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxsBusService } from './bus/NgxsBus.service';
import { IBus } from '@shared/state-bus/IBus';
import { httpInterceptorProviders } from './interceptors';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ClipboardModule,
    TranslateModule.forRoot(),
    InlineSVGModule.forRoot(),
  ],
  exports: [HttpClientModule, ClipboardModule, InlineSVGModule],
  providers: [
    {
      provide: IBus,
      useClass: NgxsBusService,
    },
    httpInterceptorProviders,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    checkIfLoaded(parentModule, 'CoreModule');
  }
}
