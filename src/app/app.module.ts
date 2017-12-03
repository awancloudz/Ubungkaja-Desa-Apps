import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
//Foto
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera} from '@ionic-native/camera';
//Google Maps
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
//Mengambil modul http
import { HttpModule} from '@angular/http';
import { Network } from '@ionic-native/network'; // *New* //
// Mengambil SEMUA halaman yg sudah dibuat
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsulanPage,UsulandetailPage,UsulancreatePage,UsulaneditPage } from '../pages/usulan/usulan';
import { BeritaPage,BeritaDusunPage } from '../pages/berita/berita';
import { PengaduanPage } from '../pages/pengaduan/pengaduan';
import { AntrianPage } from '../pages/antrian/antrian';
import { ProfilePage } from '../pages/profile/profile';
import { SettingPage } from '../pages/setting/setting';
import { LoginPage } from '../pages/login/login';
import { ProfildesaPage } from '../pages/profildesa/profildesa';
import { LocationSelectPage } from '../pages/location-select/location-select'; // *New* //

//Modul standart ionic
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Mangambil Service Provider
import { UsulanserviceProvider } from '../providers/usulanservice/usulanservice';
import { BeritaserviceProvider } from '../providers/beritaservice/beritaservice';
import { ProfileserviceProvider } from '../providers/profileservice/profileservice';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service'; // *New* //
import { GoogleMapsProvider } from '../providers/google-maps/google-maps'; // *New* //
import { BeritaPageModule } from '../pages/berita/berita.module';
import { PengaduanPageModule } from '../pages/pengaduan/pengaduan.module';
import { AntrianPageModule } from '../pages/antrian/antrian.module';
import { LoginPageModule } from '../pages/login/login.module';
import { UsulanPageModule } from '../pages/usulan/usulan.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { SettingPageModule } from '../pages/setting/setting.module';
import { ProfildesaPageModule } from '../pages/profildesa/profildesa.module';
import { LocationSelectPageModule } from '../pages/location-select/location-select.module'; // *New* //

@NgModule({
  //Deklarasi variabel page
  declarations: [
    MyApp,
    HomePage,
    //UsulanPage,
    //UsulandetailPage,
    //UsulancreatePage,
    //UsulaneditPage,
    //BeritaPage,
    //ProfilePage,
    //SettingPage,
    //LoginPage,
    //ProfildesaPage,
  ],
  //Deklarasi Modul
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BeritaPageModule,
    LoginPageModule,
    UsulanPageModule,
    ProfilePageModule,
    SettingPageModule,
    ProfildesaPageModule,
    PengaduanPageModule,
    AntrianPageModule,
    LocationSelectPageModule // *New* //
  ],
  bootstrap: [IonicApp],
  //Komponen Aplikasi
  entryComponents: [
    MyApp,
    HomePage,
    UsulanPage,
    UsulandetailPage,
    UsulancreatePage,
    UsulaneditPage,
    BeritaPage,
    BeritaDusunPage,
    ProfilePage,
    SettingPage,
    LoginPage,
    ProfildesaPage,
    PengaduanPage,
    AntrianPage,
    LocationSelectPage // *New* //
  ],
  //Service Provider
  providers: [
    //Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsulanserviceProvider,
    BeritaserviceProvider,
    ProfileserviceProvider,
    LoginserviceProvider,
    GoogleMaps,
    File,
    FileTransfer,
    Camera,
    Geolocation,
    ConnectivityServiceProvider,  // *New* //
    GoogleMapsProvider,           // *New* //
    Network                       // *New* //
  ]
})
export class AppModule {}
