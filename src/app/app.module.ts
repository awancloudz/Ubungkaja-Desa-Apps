import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
//Foto
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera} from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
//Google Maps
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
//Mengambil modul http
import { HttpModule} from '@angular/http';
import { Network } from '@ionic-native/network';
//Push Notifications
import { OneSignal } from '@ionic-native/onesignal';
// Mengambil SEMUA halaman yg sudah dibuat
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsulanPage,UsulandetailPage,UsulancreatePage,UsulaneditPage } from '../pages/usulan/usulan';
import { UsulanDusunPage,UsulanDusundetailPage } from '../pages/usulandusun/usulandusun';
import { BeritaPage,BeritaDusunPage,BeritaDetailPage } from '../pages/berita/berita';
import { PengaduanPage,PengaduandetailPage,PengaduancreatePage,PengaduaneditPage } from '../pages/pengaduan/pengaduan';
import { AntrianPage } from '../pages/antrian/antrian';
import { ProfilePage } from '../pages/profile/profile';
import { SettingPage } from '../pages/setting/setting';
import { LoginPage,DaftarPage } from '../pages/login/login';
import { ProfildesaPage } from '../pages/profildesa/profildesa';
import { LocationSelectPage } from '../pages/location-select/location-select';
import { BelanjaPage } from '../pages/belanja/belanja';
//Modul standart ionic
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Mangambil Service Provider
import { UsulanserviceProvider } from '../providers/usulanservice/usulanservice';
import { BeritaserviceProvider } from '../providers/beritaservice/beritaservice';
import { ProfileserviceProvider } from '../providers/profileservice/profileservice';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service'; 
import { GoogleMapsProvider } from '../providers/google-maps/google-maps'; 
import { BeritaPageModule } from '../pages/berita/berita.module';
import { PengaduanPageModule } from '../pages/pengaduan/pengaduan.module';
import { AntrianPageModule } from '../pages/antrian/antrian.module';
import { LoginPageModule } from '../pages/login/login.module';
import { UsulanPageModule } from '../pages/usulan/usulan.module';
import { UsulanDusunPageModule } from '../pages/usulandusun/usulandusun.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { SettingPageModule } from '../pages/setting/setting.module';
import { ProfildesaPageModule } from '../pages/profildesa/profildesa.module';
import { LocationSelectPageModule } from '../pages/location-select/location-select.module';
import { BelanjaPageModule } from '../pages/belanja/belanja.module';
import { PengaduanserviceProvider } from '../providers/pengaduanservice/pengaduanservice';
import { AntrianserviceProvider } from '../providers/antrianservice/antrianservice';
import { HomeserviceProvider } from '../providers/homeservice/homeservice';
import { UsulandusunserviceProvider } from '../providers/usulandusunservice/usulandusunservice';

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
    UsulanDusunPageModule,
    ProfilePageModule,
    SettingPageModule,
    ProfildesaPageModule,
    PengaduanPageModule,
    AntrianPageModule,
    LocationSelectPageModule,
    BelanjaPageModule
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
    UsulanDusunPage,
    UsulanDusundetailPage,
    BeritaPage,
    BeritaDusunPage,BeritaDetailPage,
    ProfilePage,
    SettingPage,
    LoginPage,DaftarPage,
    ProfildesaPage,
    PengaduanPage,PengaduandetailPage,PengaduancreatePage,PengaduaneditPage,
    AntrianPage,
    LocationSelectPage,
    BelanjaPage
  ],
  //Service Provider
  providers: [
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
    FileChooser,
    Geolocation,
    ConnectivityServiceProvider, 
    GoogleMapsProvider,          
    Network,
    PengaduanserviceProvider,
    AntrianserviceProvider,  
    OneSignal,
    HomeserviceProvider,
    UsulandusunserviceProvider,                    
  ]
})
export class AppModule {}
