import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import _ from 'lodash';
import CryptoJS from 'crypto-js';
import { NgxsModule } from '@ngxs/store';
import { AuthBaseState } from '@core/auth';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

function des(data: string) {
  return CryptoJS.AES.decrypt(
    data,
    environment.stateMangementSecretKey
  ).toString(CryptoJS.enc.Utf8);
}

function enc(data: string) {
  return CryptoJS.AES.encrypt(
    data,
    environment.stateMangementSecretKey
  ).toString();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          const auth = localStorage.getItem('auth');
          if (_.isEmpty(des(auth!)) || _.isNull(des(auth!))) {
            return JSON.parse('{}');
          } else {
            return JSON.parse(des(auth!)).accessToken;
          }
        },
      },
    }),
    AppRoutingModule,
    NgbModule,
    NgxsModule.forRoot([AuthBaseState]),
    NgxsResetPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: [
        'auth',
        'campaign',
        'items',
        'promoter',
        'workspace',
        'financeManager',
        'dashboard'
      ],
      deserialize: (state: string) => JSON.parse(des(state)),
      serialize: (state: any) => enc(JSON.stringify(state)),
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
