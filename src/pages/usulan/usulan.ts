import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
//Tambahkan Provider
import { UsulanserviceProvider } from '../../providers/usulanservice/usulanservice';
//Tambahkan Variabel Global
import { UsulanArray } from '../../pages/usulan/usulanarray';

// INDEX USULAN //
@Component({
  templateUrl: 'usulan.html',
})
export class UsulanPage {
  //Deklarasi Variabel Array Item
  items:UsulanArray[]=[];
  judul:String;
  deskripsi:Text;
  constructor(public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public usulanservice:UsulanserviceProvider,public _toast:ToastController) {
  
  }

  //Tampil data awal
  ionViewDidLoad() {
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    loadingdata.present();
    //Tampilkan data dari server
    this.usulanservice.tampilkanusulan().subscribe(
      //Jika data sudah berhasil di load
      (data:UsulanArray[])=>{
        this.items=data;
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
        loadingdata.dismiss();
      }
    );
  }

  //Action ketika tombol di klik
  tomboldetail(item) {
    this.nav.push(UsulandetailPage, { item: item });
  }
  tombolcreate() {
    this.nav.push(UsulancreatePage);
  }
  tomboltahan(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Action',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            //Alert Konfirmasi
            let confirm = this.alertCtrl.create({
              title: 'Konfirmasi',
              message: 'Yakin Menghapus Data',
              buttons: [
                {
                  text: 'Ya',
                  handler: () => {
                    //Hapus Susulan
                    this.usulanservice.hapususulan(item).subscribe(
                      (data:any)=>{
                        let mes=this._toast.create({
                        message:'Data dihapus',
                        duration:2000,
                        position:'top'
                        });
                        this.items.splice(this.items.indexOf(item),1);
                        mes.present();
                      }
                    );
                    //End Hapus Susulan
                  }
                },
                {
                  text: 'Tidak',
                  role: 'cancel',
                  handler: () => {
                    //console.log('Batal');
                  }
                }
              ]
            });
            confirm.present();
          }
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.nav.push(UsulaneditPage, { item: item });
          }
        },
        {
          text: 'Batal',
          role: 'cancel', 
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            
          }
        }
      ]
    });
    actionSheet.present();
  }
}

// DETAIL USULAN //
@Component ({
            templateUrl: 'usulan-detail.html',
            entryComponents:[ UsulanPage ],
})

export class UsulandetailPage {
  item;
  items:UsulanArray[]=[];
  id:Number;
  tanggal:Date;
  judul:String;
  id_kategori:Number;
  id_warga:Number;
  foto:String;
  deskripsi:Text;
  status:Number;

  constructor (params: NavParams,public nav: NavController,
    public loadincontroller:LoadingController,public usulanservice:UsulanserviceProvider,public _toast:ToastController,public alertCtrl: AlertController) {
    this.item = params.data.item;
  }

  ionViewDidLoad() {
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    loadingdata.present();
    //Tampilkan data dari server
    this.usulanservice.tampilkanusulan().subscribe(
      //Jika data sudah berhasil di load
      (data:UsulanArray[])=>{
        this.items=data;
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
        loadingdata.dismiss();
      }
    );
  }
  tomboledit(item){
    this.nav.push(UsulaneditPage, { item: item });
  }
  tombolhapus(item){
    //Alert Konfirmasi
    let confirm = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Yakin Menghapus Data',
      buttons: [
        {
          text: 'Ya',
          handler: () => {
            //Hapus Susulan
            this.usulanservice.hapususulan(item).subscribe(
              (data:any)=>{
                let mes=this._toast.create({
                message:'Data dihapus',
                duration:2000,
                position:'top'
                });
                this.items.splice(this.items.indexOf(item),1);
                mes.present();
                this.nav.setRoot(UsulanPage);
              }
            );
            //End Hapus Susulan
            
          }
        },
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            //console.log('Batal');
          }
        }
      ]
    });
    confirm.present();
  }
}

// CREATE USULAN //
@Component({
  templateUrl: 'usulan-create.html',
  //Set komponen * Wajib *
  entryComponents:[ UsulanPage ],
})
export class UsulancreatePage {
  items:UsulanArray[]=[];
  id:Number;
  tanggal:Date;
  judul:String;
  id_kategori:Number;
  id_warga:Number;
  foto:String;
  deskripsi:Text;
  status:Number;

  constructor(private camera: Camera,public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public usulanservice:UsulanserviceProvider,public _toast:ToastController,public alertCtrl: AlertController) {
      /*const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }*/
    }

  
  //Simpan Data Usulan
  tambahusulan(){
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Data Usulan Terkirim',
      buttons: ['OK']
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Mengirim Data..."
    });
    loadingdata.present();
    //Mengambil value dari input field untuk dimasukkan ke UsulanArray
    this.usulanservice.tambahusulan(new UsulanArray(this.id,this.tanggal,this.judul,this.id_kategori,this.id_warga,this.foto,this.deskripsi,this.status))
    .subscribe(
      (data:UsulanArray)=>{
        //Kirim Variable UsulanArray ke Usulanservice.ts
        if(data!=null){
          this.items.push(new UsulanArray(this.id,this.tanggal,this.judul,this.id_kategori,this.id_warga,this.foto,this.deskripsi,this.status));
        }
        loadingdata.dismiss();
        this.nav.setRoot(UsulanPage);
      },
      function(error){

      },
      function(){
        alert.present();
      }
    );
  }
  /*tombolkamera(options){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
     }, (err) => {
      // Handle error
     });
  }*/
}

// EDIT USULAN //
@Component({
  templateUrl: 'usulan-edit.html',
  //Set komponen * Wajib *
  entryComponents:[ UsulanPage ],
})
export class UsulaneditPage {
  item;
  items:UsulanArray[]=[];
  id:Number;
  tanggal:Date;
  judul:String;
  id_kategori:Number;
  id_warga:Number;
  foto:String;
  deskripsi:Text;
  status:Number;
  constructor(params: NavParams,public nav: NavController,
    public loadincontroller:LoadingController,public usulanservice:UsulanserviceProvider,public _toast:ToastController,public alertCtrl: AlertController) {
    this.item = params.data.item;
  }

  editusulan(lama:UsulanArray,baru:UsulanArray){
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
    this.usulanservice.editusulan(new UsulanArray(this.id,this.tanggal,this.judul,this.id_kategori,this.id_warga,this.foto,this.deskripsi,this.status))
    .subscribe(
      (data:any)=>{
        //Kirim Variable UsulanArray ke Usulanservice.ts
        if(data.affectedRows==1)
        {
          this.items[this.items.indexOf(lama)]=baru;
        }
        loadingdata.dismiss();
        this.nav.setRoot(UsulanPage);
      },
      function(error){

      },
      function(){
        alert.present();
      }
    );  
  }

}

