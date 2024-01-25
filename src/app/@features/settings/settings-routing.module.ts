import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { SocialMediaAccountsComponent } from './components/social-media-accounts/social-media-accounts.component';

const routes: Routes = [
  {
  path: '',
  component: ProfileInfoComponent,
},
{
  path: 'profile-info',
  component: ProfileInfoComponent,
},
{
  path: 'account-settings',
  component:AccountSettingsComponent,
},
{
  path: 'social-accounts',
  component: SocialMediaAccountsComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
