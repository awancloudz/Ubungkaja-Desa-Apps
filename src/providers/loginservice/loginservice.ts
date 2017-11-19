import { Injectable } from '@angular/core';
//Tambahakan aksilogin
import { LoginArray } from '../../pages/login/loginarray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

/*
  Generated class for the LoginserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginserviceProvider {
  //Deklarasi variabel
  private items:LoginArray[]=[];
  //Memanggil URL Api
  //private url:string="http://192.168.1.37:8000/api/loginuser/";
  private url:string="http://indoneseo.com/desa/public/api/loginuser/";
  constructor(public _http: Http) {
  }

//Tambah login
tambahlogin(item:LoginArray){
  return this._http.get(this.url+item.noktp)
  .map((response:Response)=>response.json());
}

}
