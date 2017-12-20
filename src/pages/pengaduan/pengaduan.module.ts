import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PengaduanPage,PengaduandetailPage,PengaduancreatePage,PengaduaneditPage } from './pengaduan';

@NgModule({
  declarations: [
    PengaduanPage,PengaduandetailPage,PengaduancreatePage,PengaduaneditPage
  ],
  imports: [
    IonicPageModule.forChild(PengaduanPage),
  ],
})
export class PengaduanPageModule {}
