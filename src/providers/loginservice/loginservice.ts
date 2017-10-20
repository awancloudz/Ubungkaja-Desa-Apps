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
  private url:string="http://desa.indoneseo.com/public/api/loginuser/";
  constructor(public _http: Http) {
  }

//Tambah usulan baru
tambahlogin(item:LoginArray){
  return this._http.get(this.url+item.noktp)
  .map((response:Response)=>response.json());
}

}
