import { Component } from '@angular/core';
import { NavController,AlertController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  warga: Array<{nama: string}>;
  constructor(public platform: Platform, public navCtrl: NavController,private storage: Storage,public alertCtrl: AlertController) {
    //TOMBOL EXIT
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
          let confirm = this.alertCtrl.create({
            title: 'Konfirmasi',
            message: 'Anda Ingin Keluar dari Aplikasi',
            buttons: [
              {
                text: 'Tidak',
                role: 'cancel',
                handler: () => {
                
                }
              },
              {
                text: 'Ya',
                handler: () => {
                  navigator['app'].exitApp();
                }
              }
            ]
          });
          confirm.present();                
      });
    });
  }
  ionViewDidLoad(){
    this.storage.get('nama_warga').then((val) => {
      this.warga = [
        { nama: val },
      ];
    });
  }
  
}
