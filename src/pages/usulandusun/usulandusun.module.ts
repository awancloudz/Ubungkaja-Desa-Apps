import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsulanDusunPage,UsulanDusundetailPage } from './usulandusun';

@NgModule({
  declarations: [
    UsulanDusunPage,UsulanDusundetailPage
  ],
  imports: [
    IonicPageModule.forChild(UsulanDusunPage),
  ],
})
export class UsulanDusunPageModule {}
