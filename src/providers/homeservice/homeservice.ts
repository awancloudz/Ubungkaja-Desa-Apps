import { Injectable } from '@angular/core';

//Tambahakan aksiusul
import { HomeArray } from '../../pages/home/homearray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
/*
  Generated class for the HomeserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HomeserviceProvider {
  //Deklarasi variabel
  private items:HomeArray[]=[];
  //Memanggil URL Api
  private url:string="http://forkomperbekelbali.com/desa/public/api/perangkat";
  constructor(public _http: Http) {
  }

  //Cek + Tambah perangkat
  tambahperangkat(item:HomeArray){
    let body = JSON.stringify(item);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
}
