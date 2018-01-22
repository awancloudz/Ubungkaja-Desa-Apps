import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
import { BeritaserviceProvider} from '../../providers/beritaservice/beritaservice';
import { BeritaArray } from '../../pages/berita/beritaarray';
import { UsulanserviceProvider} from '../../providers/usulanservice/usulanservice';
import { UsulanArray } from '../../pages/usulan/usulanarray';
import { Storage } from '@ionic/storage';
//Google Maps
import { GoogleMaps, Geocoder, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
/**
 * Generated class for the BeritaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-berita',
  templateUrl: 'berita.html',
})
export class BeritaPage {
  items:BeritaArray[]=[];
  constructor(public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public beritaservice:BeritaserviceProvider,public _toast:ToastController,public alertCtrl: AlertController
    ,public storage: Storage) {
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

  ionViewDidLoad() {

    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    loadingdata.present();
    //Ambil data ID dari storage
    this.storage.get('id_desa').then((iddesa) => {
      this.beritaservice.tampilkanberita(iddesa).subscribe(
        (data:BeritaArray[])=>{
          this.items=data;
        },
        function (error){   
        },
        function(){
          loadingdata.dismiss();
        }
      );
    });
  }
  tomboldetail(item) {
    this.nav.push(BeritaDusunPage, { item: item });
  }
}

@Component({
  selector: 'page-berita',
  templateUrl: 'berita-dusun.html' 
})
export class BeritaDusunPage {
  item;
  id:Number;
  items:BeritaArray[]=[];
  constructor(params: NavParams,public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public beritaservice:BeritaserviceProvider,public _toast:ToastController,public alertCtrl: AlertController
    ,public storage: Storage) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

  ionViewDidLoad() {

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
      this.beritaservice.tampilkanberita(iddesa).subscribe(
        (data:BeritaArray[])=>{
          //console.log(this.item);
          //Detail Usulan
          this.beritaservice.tampilkandetail(new BeritaArray(this.item.id)).subscribe(
            (data:BeritaArray[])=>{
              this.items=data;
              console.log(this.items);
            }
          );
        },
        function (error){
          //Jika Koneksi Tidak ada
          if(error.status == 0){
            info.present();
          }
          loadingdata.dismiss();   
        },
        function(){
          loadingdata.dismiss();
        }
      );
    });
  }
  tomboldetail(item2) {
    this.nav.push(BeritaDetailPage, { item: item2 });
  }
}

// DETAIL USULAN //
@Component ({
    templateUrl: 'berita-detail.html',
})

export class BeritaDetailPage {
  item;
  map: GoogleMap;
  items:UsulanArray[]=[];
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
    public loadincontroller:LoadingController,public usulanservice:UsulanserviceProvider,public _toast:ToastController,public alertCtrl: AlertController,
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
        (data:UsulanArray[])=>{
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
}
