import { Component } from '@angular/core';
import { NavController,AlertController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
//Tambahkan Provider
import { HomeserviceProvider } from '../../providers/homeservice/homeservice';
//Tambahkan Variabel Global
import { HomeArray } from '../../pages/home/homearray';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  warga: Array<{nama: string}>;
  items:HomeArray[]=[];
  id:Number;
  id_warga: Number;
  app_id: String;

  constructor(public platform: Platform, public navCtrl: NavController,public storage: Storage,
    public homeservice:HomeserviceProvider,public alertCtrl: AlertController,public oneSignal: OneSignal) {
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

      //Check App ID
      this.oneSignal.getIds().then((ids) => {
        this.app_id = ids.userId;
        //Cek ID Warga
        this.storage.get('id_user').then((val) => {
          this.id_warga = val;
          //Cek + Simpan Perangkat
          this.homeservice.tambahperangkat(new HomeArray(this.id,this.id_warga,this.app_id))
          .subscribe(
            (data:HomeArray)=>{
            },
            function(error){
            },
            function(){
            }
          );
          //End Cek simpan perangkat
        });
        //End Cek ID Warga
      });
      //End Cek App ID
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
