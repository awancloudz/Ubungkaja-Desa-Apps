import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
import { BeritaserviceProvider} from '../../providers/beritaservice/beritaservice';
import { BeritaArray } from '../../pages/berita/beritaarray';

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
  id:Number
  tahap:String
  tanggalmulai:Date
  tanggalselesai:Date
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

}
