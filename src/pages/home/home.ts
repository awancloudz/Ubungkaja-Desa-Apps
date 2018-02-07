import { Component } from '@angular/core';
import { NavController,AlertController,Platform,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
//Tambahkan Provider
import { HomeserviceProvider } from '../../providers/homeservice/homeservice';
//Tambahkan Variabel Global
import { HomeArray } from '../../pages/home/homearray';
import { UsulanArray } from '../../pages/usulan/usulanarray';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items:HomeArray[]=[];
  items2:UsulanArray[]=[];
  id:Number;
  id_warga: Number;
  app_id: String;

  constructor(public platform: Platform, public navCtrl: NavController,public storage: Storage,
    public homeservice:HomeserviceProvider,public alertCtrl: AlertController,public oneSignal: OneSignal,
    public loadincontroller:LoadingController) {
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
      /*this.oneSignal.getIds().then((ids) => {
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
      //End Cek App ID*/
    });
  }
  ionViewDidLoad(){
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    let info = this.alertCtrl.create({
      title: 'Tidak Terhubung ke server',
      message: 'Silahkan Periksa koneksi internet anda...',
    });
    loadingdata.present();
    //Ambil data ID dari storage
    this.storage.get('id_desa').then((iddesa) => {
      //Tampilkan data dari server
      this.homeservice.tampilkanusulanbaru(iddesa).subscribe(
        //Jika data sudah berhasil di load
        (data2:UsulanArray[])=>{
          this.items2=data2;
        },
        //Jika Error
        function (error){  
          //Jika Koneksi Tidak ada
          if(error.status == 0){
            info.present();
          }
          loadingdata.dismiss(); 
        },
        //Tutup Loading
        function(){
          loadingdata.dismiss();
        }
      );
    });
  }
  
}
