import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { SocialMediaAccountsComponent } from './components/social-media-accounts/social-media-accounts.component';


@NgModule({
  declarations: [
    SettingsComponent,
    SocialMediaAccountsComponent,
    ProfileInfoComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
