import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage,DaftarPage,ForgotPage } from './login';

@NgModule({
  declarations: [
    LoginPage,DaftarPage,ForgotPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
