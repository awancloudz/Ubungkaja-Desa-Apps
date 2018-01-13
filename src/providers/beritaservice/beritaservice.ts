import { Injectable } from '@angular/core';
import { BeritaArray } from '../../pages/berita/beritaarray';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

/*
  Generated class for the BeritaserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BeritaserviceProvider {
  private items:BeritaArray[]=[];
  private url:string="http://forkomperbekelbali.com/desa/public/api/berita";
  private url2:string="http://forkomperbekelbali.com/desa/public/api/beritahasil";
  constructor(public _http: Http) {}

  tampilkanberita(iddesa)
  {
   return this._http.get(this.url+"/"+iddesa)
   .map((response:Response)=>response.json());
  }
  tampilkandetail(item:BeritaArray){
    return this._http.get(this.url2+"/"+item.id)
    .map((response:Response)=>response.json());
  }
}
