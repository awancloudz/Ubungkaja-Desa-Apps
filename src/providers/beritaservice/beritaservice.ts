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
  private url:string="http://192.168.43.20:8000/api/berita";
  //private url:string="http://desa.indoneseo.com/public/api/berita";
  constructor(public _http: Http) {}

  tampilkanberita()
  {
   return this._http.get(this.url)
   .map((response:Response)=>response.json());
  }

}
