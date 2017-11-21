import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsulanPage,UsulandetailPage,UsulancreatePage,UsulaneditPage } from './usulan';

@NgModule({
  declarations: [
    UsulanPage,UsulandetailPage,UsulancreatePage,UsulaneditPage
  ],
  imports: [
    IonicPageModule.forChild(UsulanPage),
  ],
})
export class UsulanPageModule {}
