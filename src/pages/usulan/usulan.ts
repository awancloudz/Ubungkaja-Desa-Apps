import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ViewController, IonicPage, NavController, ModalController,NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
//Tambahkan Provider
import { UsulanserviceProvider } from '../../providers/usulanservice/usulanservice';
//Tambahkan Variabel Global
import { UsulanArray } from '../../pages/usulan/usulanarray';
//Google Maps
import { GoogleMaps, Geocoder, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
//Camera
import {Camera, CameraOptions} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { LocationSelectPage } from '../../pages/location-select/location-select';

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
                        this.nav.setRoot(UsulanPage);
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
  map: GoogleMap;
  items:UsulanArray[]=[];
  id:Number;
  tanggal:Date;
  judul:String;
  id_kategori:Number;
  id_warga:Number;
  deskripsi:Text;
  status:Number;
  latitude:number;
  longitude:number;
  
  constructor (public platform: Platform,private googleMaps: GoogleMaps, params: NavParams,public nav: NavController,
    public loadincontroller:LoadingController,public usulanservice:UsulanserviceProvider,public _toast:ToastController,public alertCtrl: AlertController) {
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
    //Tampilkan data dari server
    this.usulanservice.tampilkanusulan().subscribe(
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
    this.nav.push(UsulaneditPage, { item: item });
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
                this.nav.setRoot(UsulanPage);
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

// CREATE USULAN //
@Component({
  templateUrl: 'usulan-create.html',
  //Set komponen * Wajib *
  entryComponents:[ UsulanPage ],
  providers: [ GoogleMapsProvider ]
})
export class UsulancreatePage {
  //Pencarian MAP
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  //Camera
  public photos : any;
  public imageURI:any;
  public imageFileName:any;
  
  map2: GoogleMap;
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
  latitude:any;
  longitude:any;

  //Pencarian MAP
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;

  constructor(public maps: GoogleMapsProvider,public zone: NgZone,
    private geolocation2: Geolocation,
    private googleMaps2: GoogleMaps,private transfer: FileTransfer,
    private camera: Camera,private modalCtrl:ModalController,
    public nav: NavController,public platform: Platform,
    public actionSheetCtrl: ActionSheetController,public loadincontroller:LoadingController,
    public usulanservice:UsulanserviceProvider,public _toast:ToastController,public alertCtrl: AlertController) {
    this.searchDisabled = true;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
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
    this.loadMap2();
    //Pencarian MAP
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.maps.map);
      this.searchDisabled = false;
    });
  }
  //Pencarian MAP
  selectPlace(place){
    //Kosongkan data
    this.places = [];
    let location = {
        lat: null,
        lng: null,
        name: place.name
    };
    //Set Posisi Map Baru
    this.placesService.getDetails({placeId: place.place_id}, (details) => {
        this.zone.run(() => {
            location.name = details.name;
            location.lat = details.geometry.location.lat();
            location.lng = details.geometry.location.lng();
            //this.saveDisabled = false;
            //Posisi Center
            this.maps.map.setCenter({lat: location.lat, lng: location.lng});
            this.location = location;
            this.query = details.name;
            //Marker Baru
            this.maps.clearMarkers();
            let marker = new google.maps.Marker({
                map: this.maps.map,
                animation: google.maps.Animation.DROP,
                position: {lat: location.lat, lng: location.lng}
            });
            this.maps.markers.push(marker);
            //Simpan Posisi Baru
            this.latitude = location.lat;
            this.longitude = location.lng;
        });
    });
  }

  searchPlace(){
      this.saveDisabled = true;
      if(this.query.length > 0 && !this.searchDisabled) {
          let config = {
              types: ['geocode'],
              input: this.query
          }
          this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
              if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
                  this.places = [];
                  predictions.forEach((prediction) => {
                      this.places.push(prediction);
                  });
              }
          });
      } else {
          this.places = [];
      }
  }
  
  /*bukaModal() {
    let modal = this.modalCtrl.create(LocationSelectPage);
    modal.present();
  }*/
  loadMap2() {
  //Geolocation
  let watch2 = this.geolocation2.getCurrentPosition().then((data) => {
  
  this.latitude = data.coords.latitude;
  this.longitude = data.coords.longitude;
    
    /*let mapOptions2: GoogleMapOptions = {
      camera: {
        target: {
          lat: data.coords.latitude,
          lng: data.coords.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };
    
    this.map2 = this.googleMaps2.create('map_canvas2', mapOptions2);
    
    // Wait the MAP_READY before using any methods.
    this.map2.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map2.addMarker({
            draggable: true,
            title: 'Lokasi',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: data.coords.latitude,
              lng: data.coords.longitude
            },
            size:	{ 
               width: 200,
               height: 200 
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                //alert('clicked');
              });
          });
      });*/
    });
  }
  
  ngOnInit() {
    this.photos = [];
  }
  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
        title: 'Yakin Menghapus Foto Ini ?',
        message: '',
        buttons: [
          {
            text: 'Tidak',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Ya',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
  }

  takePhoto() {
    const options : CameraOptions = {
      quality: 25, // picture quality
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {
        this.imageURI = imageData;
        this.photos.push(this.imageURI);
        this.photos.reverse();
        this.uploadFile();
      }, (err) => {
        console.log(err);
        this.presentToast(err);
      });
  }

  uploadFile() {
    let loader = this.loadincontroller.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'file',
      params: {'id_warga' : this.id_warga },
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://forkomperbekelbali.com/desa/public/api/upload', options)
    //fileTransfer.upload(this.imageURI, 'http://192.168.43.19:8000/api/upload', options)
      .then((data) => {
      this.imageFileName = "upload.jpg";
      loader.dismiss();
      this.presentToast("Upload Sukses");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this._toast.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Tutup');
    });
  
    toast.present();
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
    this.usulanservice.tambahusulan(new UsulanArray(this.id,this.tanggal,this.judul,this.id_kategori,this.id_warga,this.deskripsi,this.status,this.volume,this.satuan,this.longitude,this.latitude))
    .subscribe(
      (data:UsulanArray)=>{
        //Push
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

// EDIT USULAN //
@Component({
  templateUrl: 'usulan-edit.html',
  //Set komponen * Wajib *
  entryComponents:[ UsulanPage ],
})
export class UsulaneditPage {
  item;
  map3: GoogleMap;
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
  latitude:number;
  longitude:number;

  constructor(public platform: Platform,private googleMaps3: GoogleMaps,params: NavParams,public nav: NavController,
    public loadincontroller:LoadingController,public usulanservice:UsulanserviceProvider,public _toast:ToastController,public alertCtrl: AlertController) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
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
    this.loadMap3(this.item);
  }
  loadMap3(item) {

    let mapOptions3: GoogleMapOptions = {
      camera: {
        target: {
          lat: item.latitude,
          lng: item.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };
    
    this.map3 = this.googleMaps3.create('map_canvas3', mapOptions3);
    
    // Wait the MAP_READY before using any methods.
    this.map3.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map3.addMarker({
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
                //alert('clicked');
              });
          });
      });
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
    this.usulanservice.editusulan(new UsulanArray(this.id,this.tanggal,this.judul,this.id_kategori,this.id_warga,this.deskripsi,this.status,this.volume,this.satuan,this.longitude,this.latitude))
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
