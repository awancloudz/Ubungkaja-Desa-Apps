import { Injectable } from '@angular/core';

//Tambahakan aksiusul
import { UsulanArray } from '../../pages/usulan/usulanarray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

/*
  Generated class for the UsulanserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UsulanserviceProvider {
  //Deklarasi variabel
  private items:UsulanArray[]=[];
  //Memanggil URL Api
  //private url:string="http://192.168.1.4:8000/api/usulan";
  private url:string="http://indoneseo.com/desa/public/api/usulan";
  constructor(public _http: Http) {
  }

  //Tampilkan usulan
  tampilkanusulan()
  {
   return this._http.get(this.url)
   .map((response:Response)=>response.json());
  }
  
  //Tambah usulan baru
  tambahusulan(item:UsulanArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }

  //Hapus usulan
  hapususulan(item:UsulanArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }

  //Edit Usulan
  editusulan(item:UsulanArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+"/"+item.id,
                  body, options)
                 .map((response:Response)=>response.json());
  }
}
