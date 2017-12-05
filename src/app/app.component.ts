import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Mengambil halaman UTAMA yg sudah dibuat
import { HomePage } from '../pages/home/home';
import { UsulanPage } from '../pages/usulan/usulan';
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

  //Tipe Variable untuk tombol menu
  pages: Array<{title: string, icon: string, component: any}>;
  warga: Array<{nama: string}>;

  constructor(private storage: Storage,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // Value Variable dari tombol menu
    this.pages = [
      { title: 'Home', icon: "home", component: HomePage },
      { title: 'Usulan Saya',  icon: "ios-create", component: UsulanPage },
      { title: 'Hasil Musyawarah',  icon: "md-calendar", component: BeritaPage },
      { title: 'Pengaduan Saya',  icon: "ios-paper-plane", component: PengaduanPage },
      { title: 'Antrian',  icon: "ios-paper-outline", component: AntrianPage },
      { title: 'Belanja',  icon: "cart", component: BelanjaPage },
      { title: 'Profile',  icon: "person", component: ProfilePage },
      { title: 'Logout',  icon: "power", component: SettingPage },
    ];
    this.storage.get('nama_warga').then((val) => {
      this.warga = [
        { nama: val },
      ];
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
