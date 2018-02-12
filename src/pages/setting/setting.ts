import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
//Set direktori redirect * Wajib *
import { LoginPage } from '../../pages/login/login';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'setting.html',
  //Set komponen * Wajib *
  entryComponents:[ LoginPage ],
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,private events: Events) {
  }

  ionViewDidLoad() {
    this.storage.set('id_user', null);
    this.storage.set('nama_warga', null);
    this.storage.set('no_ktp', null);
    this.storage.set('level', null);
    this.storage.set('id_dusun', null);
    this.storage.set('id_desa',null);
    this.events.publish('user:umum');
    this.navCtrl.setRoot(LoginPage);
  }

}
