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
  dusun:Number;

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
    this.storage.get('id_dusun').then((iddusun) => {
      //Tampilkan data dari server
      this.usulanservice.tampilkanusulan(iddusun).subscribe(
        //Jika data sudah berhasil di load
        (data:UsulanDusunArray[])=>{
          this.items=data;
          this.dusun = iddusun;
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
    this.storage.get('id_dusun').then((iddusun) => {
      //Tampilkan data dari server
      this.usulanservice.tampilkanusulan().subscribe(
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

  diterima(item){
    this.id = item.id;
    this.id_warga = item.id_warga;
    this.status = 2;
    this.verifikasi();
  }
  ditolak(item){
    this.id = item.id;
    this.id_warga = item.id_warga;
    this.status = 3;
    this.verifikasi();
  }
  verifikasi(){
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Verifikasi Sukses',
      buttons: ['OK']
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Verifikasi Usulan..."
    });
    loadingdata.present();
    //Mengambil value dari edit field untuk dimasukkan ke UsulanArray
    this.usulanservice.editusulan(new UsulanDusunArray(this.id,this.tanggal,this.judul,this.id_kategori,this.id_warga,this.deskripsi,this.status,this.volume,this.satuan,this.longitude,this.latitude,this.pria,this.wanita,this.rtm,this.lokasi))
    .subscribe(
      (data:any)=>{
        loadingdata.dismiss();
        this.nav.setRoot(UsulanDusunPage);
      },
      function(error){

      },
      function(){
        alert.present();
      }
    );  
  }
}

