import { Injectable } from '@angular/core';
//Tambahakan aksiusul
import { AntrianArray } from '../../pages/antrian/antrianarray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

/*
  Generated class for the AntrianserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AntrianserviceProvider {
//Deklarasi variabel
  private items:AntrianArray[]=[];
  //Memanggil URL Api
  private url:string="http://forkomperbekelbali.com/desa/public/api/antrian";
  constructor(public _http: Http) {
  }

  //Tampilkan antrian
  tampilkanantrian()
  {
   return this._http.get(this.url)
   .map((response:Response)=>response.json());
  }
  
  //Tambah antrian baru
  tambahantrian(item:AntrianArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }

  //Hapus antrian
  hapusantrian(item:AntrianArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }

  //Edit antrian
  editantrian(item:AntrianArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+"/"+item.id,
                  body, options)
                 .map((response:Response)=>response.json());
  }
}
