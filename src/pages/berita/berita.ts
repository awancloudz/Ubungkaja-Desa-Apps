import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
import { BeritaserviceProvider} from '../../providers/beritaservice/beritaservice';
import { BeritaArray } from '../../pages/berita/beritaarray';
import { UsulandetailPage } from '../../pages/usulan/usulan';
import { Storage } from '@ionic/storage';
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
  templateUrl: 'berita-dusun.html',
  entryComponents:[ UsulandetailPage ], 
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
        },
        function(){
          loadingdata.dismiss();
        }
      );
    });
  }
  tomboldetail(item2) {
    this.nav.push(UsulandetailPage, { item: item2 });
  }
}
