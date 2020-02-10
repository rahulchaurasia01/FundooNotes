import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Login } from '../Model/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  baseUrl: string = environment.BaseUrl;

  constructor(private http: HttpClient) { }


  post(url, body: Login) : Observable<any> {
    console.log(this.baseUrl+" "+url+" "+body.EmailId+" "+body.password);
    return this.http.post(this.baseUrl+url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  

  get(url) {
    return this.http.get(this.baseUrl+url);
  }

  // get(url, param) {
  //   return this.http.get(this.baseUrl+url+param);
  // }

  put(url, body) {
    return this.http.put(this.baseUrl+url, body);
  }


}
