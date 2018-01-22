import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeritaPage,BeritaDusunPage,BeritaDetailPage } from './berita';

@NgModule({
  declarations: [
    BeritaPage,BeritaDusunPage,BeritaDetailPage
  ],
  imports: [
    IonicPageModule.forChild(BeritaPage),
  ],
})
export class BeritaPageModule {}
