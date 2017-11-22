import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
import { BeritaserviceProvider} from '../../providers/beritaservice/beritaservice';
import { BeritaArray } from '../../pages/berita/beritaarray';
import { UsulandetailPage } from '../../pages/usulan/usulan';
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
    public loadincontroller:LoadingController,public beritaservice:BeritaserviceProvider,public _toast:ToastController,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    loadingdata.present();

    this.beritaservice.tampilkanberita().subscribe(

      (data:BeritaArray[])=>{
        this.items=data;
      },

      function (error){   
      },

      function(){
        loadingdata.dismiss();
      }
    );
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
    public loadincontroller:LoadingController,public beritaservice:BeritaserviceProvider,public _toast:ToastController,public alertCtrl: AlertController) {
    this.item = params.data.item;
  }

  ionViewDidLoad() {

    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    loadingdata.present();
    
    this.beritaservice.tampilkanberita().subscribe(
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
  }
  tomboldetail(item2) {
    this.nav.push(UsulandetailPage, { item: item2 });
  }
}
