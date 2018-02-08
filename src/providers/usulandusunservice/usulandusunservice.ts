import { Injectable } from '@angular/core';

//Tambahakan aksiusul
import { UsulanDusunArray } from '../../pages/usulandusun/usulandusunarray';
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
export class UsulandusunserviceProvider {
  //Deklarasi variabel
  private items:UsulanDusunArray[]=[];
  //Memanggil URL Api
  private url:string="http://forkomperbekelbali.com/desa/public/api/usulan";
  constructor(public _http: Http) {
  }

  //Tampilkan usulan
  tampilkanusulan(iduser)
  {
   return this._http.get(this.url+"/"+iduser)
   .map((response:Response)=>response.json());
  }
  
  //Tambah usulan baru
  tambahusulan(item:UsulanDusunArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }

  //Hapus usulan
  hapususulan(item:UsulanDusunArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }

  //Edit Usulan
  editusulan(item:UsulanDusunArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+"/"+item.id,
                  body, options)
                 .map((response:Response)=>response.json());
  }
}