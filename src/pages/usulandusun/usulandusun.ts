import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ViewController, IonicPage, NavController, ModalController,NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
//Tambahkan Provider
import { UsulandusunserviceProvider } from '../../providers/usulandusunservice/usulandusunservice';
//Tambahkan Variabel Global
import { UsulanDusunArray } from '../../pages/usulandusun/usulandusunarray';
//Google Maps
import { GoogleMaps, Geocoder, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
//Camera
import {Camera, CameraOptions} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
//import { LocationSelectPage } from '../../pages/location-select/location-select';
import { Storage } from '@ionic/storage';
declare var google; 
// INDEX USULAN //
@Component({
  templateUrl: 'usulandusun.html',
})
export class UsulanDusunPage {
  //Deklarasi Variabel Array Item
  items:UsulanDusunArray[]=[];
  judul:String;
  deskripsi:Text;
  constructor(public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public usulanservice:UsulandusunserviceProvider,public _toast:ToastController,private storage: Storage) {
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
  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    setTimeout(() => {
      this.ionViewDidLoad();
      //console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  //Tampil data awal
  ionViewDidLoad() {
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
    this.storage.get('id_user').then((iduser) => {
      //Tampilkan data dari server
      this.usulanservice.tampilkanusulan(iduser).subscribe(
        //Jika data sudah berhasil di load
        (data:UsulanDusunArray[])=>{
          this.items=data;
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

  //Action ketika tombol di klik
  tomboldetail(item) {
    this.nav.push(UsulanDusundetailPage, { item: item });
  }
  tombolcreate() {
    //this.nav.push(UsulancreatePage);
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
                  text: 'Tidak',
                  role: 'cancel',
                  handler: () => {
                    //console.log('Batal');
                  }
                },
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
                        //this.items.splice(this.items.indexOf(item),1);
                        mes.present();
                        this.nav.setRoot(UsulanDusunPage);
                      }
                    );
                    //End Hapus Susulan
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
            //this.nav.push(UsulaneditPage, { item: item });
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
            templateUrl: 'usulandusun-detail.html',
            entryComponents:[ UsulanDusunPage ],
})

export class UsulanDusundetailPage {
  item;
  map: GoogleMap;
  items:UsulanDusunArray[]=[];
  id:Number;
  tanggal:Date;
  judul:String;
  id_kategori:Number;
  id_warga:Number;
  deskripsi:Text;
  status:Number;
  volume:String;
  satuan:String;
  pria:String;
  wanita:String;
  rtm:String;
  lokasi:String;
  latitude:any;
  longitude:any;
  
  constructor (public platform: Platform,private googleMaps: GoogleMaps, params: NavParams,public nav: NavController,
    public loadincontroller:LoadingController,public usulanservice:UsulandusunserviceProvider,public _toast:ToastController,public alertCtrl: AlertController,
    private storage: Storage) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

  ionViewDidLoad() {
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    loadingdata.present();
    //Ambil data ID dari storage
    this.storage.get('id_user').then((iduser) => {
      //Tampilkan data dari server
      this.usulanservice.tampilkanusulan(iduser).subscribe(
        //Jika data sudah berhasil di load
        (data:UsulanDusunArray[])=>{
          //this.items=data;
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
    this.loadMap(this.item);
    
  }
  
  loadMap(item) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: item.latitude,
          lng: item.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = this.googleMaps.create('map_canvas', mapOptions);
    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        // Now you can use all methods safely.
        this.map.addMarker({
            draggable: true,
            title: 'Lokasi',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: item.latitude,
              lng: item.longitude
            },
            size:	{ 
               width: 200,
               height: 200 
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                //jika diklik
              });
          });
      });
  }
  
  tomboledit(item){
    //this.nav.push(UsulaneditPage, { item: item });
  }
  tombolhapus(item){
    //Alert Konfirmasi
    let confirm = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Yakin Menghapus Data',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            //console.log('Batal');
          }
        },
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
                //this.items.splice(this.items.indexOf(item),1);
                mes.present();
                this.nav.setRoot(UsulanDusunPage);
              }
            );
            //End Hapus Susulan
            
          }
        }
      ]
    });
    confirm.present();
  }
}

