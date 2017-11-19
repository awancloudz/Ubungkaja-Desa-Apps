import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  warga: Array<{nama: string}>;
  constructor( public navCtrl: NavController,private storage: Storage) {

  }
  ionViewDidLoad(){
    this.storage.get('nama_warga').then((val) => {
      this.warga = [
        { nama: val },
      ];
    });
  }
  
}
