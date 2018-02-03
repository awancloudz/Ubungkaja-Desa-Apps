import { Injectable } from '@angular/core';
import { ProfileArray } from '../../pages/profile/profilearray';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
/*
  Generated class for the ProfilserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfileserviceProvider {
  private items:ProfileArray[]=[];
  private url:string="http://forkomperbekelbali.com/desa/public/api/warga";
  constructor(public _http: Http) {
  }


  //Tampilkan profile
  tampilkanprofile(val)
  {
    return this._http.get(this.url+"/"+val)
   .map((response:Response)=>response.json());
  }
  //Edit Usulan
  editdataprofile(item:ProfileArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  
}
