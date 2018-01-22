import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
//Tambahkan Provider
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
//Tambahkan Variabel Global
import { LoginArray } from '../../pages/login/loginarray';
//Set direktori redirect * Wajib *
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  templateUrl: 'login.html',
  //Set komponen * Wajib *
  entryComponents:[ HomePage ], 
})
export class LoginPage {
  items:LoginArray[]=[];
  noktp:String;
  password:String;
  constructor(public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public loginservice:LoginserviceProvider,public _toast:ToastController,
    public alertCtrl: AlertController,private storage: Storage) {
  }

ionViewDidLoad(){
  this.storage.get('id_user').then((val) => {
    if(val != null){
      this.nav.setRoot(HomePage);
    }
  });
}
//Cek Data Login
ceklogin(){
  //Pemberitahuan
  let gagal = this.alertCtrl.create({
    title: 'Informasi',
    subTitle: 'Login Gagal, cek No.KTP/Password.',
    buttons: ['OK']
  });
  //Loading Data
  let loadingdata=this.loadincontroller.create({
      content:"Proses Login..."
  });
  let info = this.alertCtrl.create({
    title: 'Tidak Terhubung ke server',
    message: 'Silahkan Periksa koneksi internet anda...',
  });
  loadingdata.present();
  //Mengambil value dari input field untuk dimasukkan ke UsulanArray
  this.loginservice.tambahlogin(new LoginArray(this.noktp,this.password))
  .subscribe(
    (data:LoginArray)=>{
      //Seleksi Data dari server
      for(var key in data)
      {
         if(data[key].noktp != null){
           if(data[key].password == this.password){
            //Redirect enuju ke root HomePage * Wajib *
            this.nav.setRoot(HomePage);
            this.storage.set('id_user', data[key].id);
            this.storage.set('nama_warga', data[key].nama);
            this.storage.set('no_ktp', data[key].noktp);
            this.storage.set('id_dusun', data[key].id_dusun);
            this.storage.set('id_desa', data[key].id_profiledesa);
           }
           else{
              gagal.present();
           }
         }
         else{
           gagal.present();
         }
      }
    },
    function(error){
      //Jika Koneksi Tidak ada
      if(error.status == 0){
        info.present();
      }
      loadingdata.dismiss();
    },
    function(){
    //Sembunyikan Loading
      loadingdata.dismiss();
    }
  );
}

}

