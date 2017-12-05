import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BelanjaPage } from './belanja';

@NgModule({
  declarations: [
    BelanjaPage,
  ],
  imports: [
    IonicPageModule.forChild(BelanjaPage),
  ],
})
export class BelanjaPageModule {}
