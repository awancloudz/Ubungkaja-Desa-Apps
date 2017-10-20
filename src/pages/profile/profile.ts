import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
import { ProfileserviceProvider } from '../../providers/profileservice/profileservice';
import { ProfileArray } from '../../pages/profile/profilearray';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  templateUrl: 'profile.html',
})
export class ProfilePage {
  item;
  items:ProfileArray[]=[];
  id:Number;
  noktp:Number;
  nama:String;
  alamat:Text;
  tanggal_lahir:Date;
  jenis_kelamin:String;
  password:String;
  id_dusun:Number;
  email:any;
  nomor_telepon:Number;

  constructor(params: NavParams,public nav: NavController,
    public loadincontroller:LoadingController,public profileservice:ProfileserviceProvider,
    public _toast:ToastController,public alertCtrl: AlertController,private storage: Storage) {
  }
  
  //Tampil data awal
  ionViewDidLoad() {
    //Ambil data ID dari storage
    this.storage.get('no_ktp').then((val) => {
      //Loading bar
      let loadingdata=this.loadincontroller.create({
        content:"Loading..."
      });
      loadingdata.present();
      //Tampilkan data dari server
      this.profileservice.tampilkanprofile(val).subscribe(
        //Jika data sudah berhasil di load
        (data:ProfileArray[])=>{
          //this.items=data;
          for(var key in data)
          {
            this.id = data[key].id;
            this.noktp = data[key].noktp;
            this.nama = data[key].nama;
            this.alamat = data[key].alamat;
          }
        },
        //Jika Error
        function (error){   
        },
        //Tutup Loading
        function(){
          loadingdata.dismiss();
        }
      );
    });
  }

  editprofile(lama:ProfileArray,baru:ProfileArray){
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Edit Data Sukses',
      buttons: ['OK']
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Mengubah Data..."
    });
    loadingdata.present();
    //Mengambil value dari edit field untuk dimasukkan ke UsulanArray
    this.profileservice.editdataprofile(new ProfileArray(this.id,this.noktp,this.nama,this.alamat,this.tanggal_lahir,this.jenis_kelamin,this.password,this.id_dusun,this.email,this.nomor_telepon))
    .subscribe(
      (data:any)=>{
        //Kirim Variable UsulanArray ke Usulanservice.ts
        if(data.affectedRows==1)
        {
          this.items[this.items.indexOf(lama)]=baru;
        }
        loadingdata.dismiss();
      },
      function(error){

      },
      function(){
        alert.present();
      }
    );  
  }

}
