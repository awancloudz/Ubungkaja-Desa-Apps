import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
// Mengambil halaman UTAMA yg sudah dibuat
import { HomePage } from '../pages/home/home';
import { UsulanPage } from '../pages/usulan/usulan';
import { UsulanDusunPage } from '../pages/usulandusun/usulandusun';
import { BeritaPage } from '../pages/berita/berita';
import { ProfilePage } from '../pages/profile/profile';
import { SettingPage } from '../pages/setting/setting';
import { LoginPage} from '../pages/login/login';
import { ProfildesaPage} from '../pages/profildesa/profildesa';
import { PengaduanPage} from '../pages/pengaduan/pengaduan';
import { AntrianPage} from '../pages/antrian/antrian';
import { LocationSelectPage } from '../pages/location-select/location-select';
import { BelanjaPage } from '../pages/belanja/belanja';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //halaman yang pertama kali dipanggil
  rootPage: any = LoginPage;
  level = false;
  //Tipe Variable untuk tombol menu
  pages: Array<{title: string, icon: string, color: any,component: any}>;
  pages2: Array<{title: string, icon: string, color: any,component: any}>;
  warga: Array<{nama: string}>;
  ids: any;
  constructor(private storage: Storage,public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,private oneSignal: OneSignal,private events: Events) {
    //Variabel Awal
    this.warga = [];
    this.initializeApp();
    this.listenToLoginEvents();
    // Value Variable dari tombol menu
    this.pages = [
      { title: 'Home', icon: "home", color: "iconprimary" ,  component: HomePage },
      { title: 'Usulan Saya', icon: "edit", color: "iconprimary", component: UsulanPage },
      { title: 'Hasil Musyawarah',  icon: "calendar-check-o", color: "iconprimary", component: BeritaPage },
      //{ title: 'Pengaduan Saya',  icon: "ios-paper-plane", color: "iconprimary", component: PengaduanPage },
      //{ title: 'Layanan',  icon: "ios-paper-outline", color: "iconprimary", component: AntrianPage },
      { title: 'Belanja',  icon: "shopping-cart", color: "iconprimary", component: BelanjaPage },
      { title: 'Profile',  icon: "user", color: "iconprimary", component: ProfilePage },
      { title: 'Logout',  icon: "sign-out", color: "iconprimary", component: SettingPage },
    ];

    this.pages2 = [
      { title: 'Home', icon: "home", color: "iconprimary" ,  component: HomePage },
      { title: 'Usulan Warga', icon: "edit", color: "iconprimary", component: UsulanDusunPage },
      { title: 'Hasil Musyawarah',  icon: "calendar-check-o", color: "iconprimary", component: BeritaPage },
      { title: 'Logout',  icon: "sign-out", color: "iconprimary", component: SettingPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.oneSignal.startInit('0cd199c8-a64b-4b4d-be1f-913897925183', '1038653536158');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        this.nav.setRoot(UsulanPage);
      });
        
      this.oneSignal.endInit();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:warga', (data) => {
      this.level = true;
      this.warga = [
        { nama: data },
      ];
    });

    this.events.subscribe('user:dusun', (data) => {
      this.level = false;
      this.warga = [
        { nama: data },
      ];
    });
  }
}
