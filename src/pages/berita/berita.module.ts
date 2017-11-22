import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeritaPage,BeritaDusunPage } from './berita';

@NgModule({
  declarations: [
    BeritaPage,BeritaDusunPage
  ],
  imports: [
    IonicPageModule.forChild(BeritaPage),
  ],
})
export class BeritaPageModule {}
