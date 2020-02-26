import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private baseUrl: string = environment.BaseUrl;

  private headerOption: any;

  constructor(private http: HttpClient) { }

  private createHttpOptions(token: string) : any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer "+ token
      })
    };

    return httpOptions;
  }


  post(url: string, body, tokenRequired: boolean = false) : Observable<any> {

    if(tokenRequired) {
      this.headerOption = this.createHttpOptions(localStorage.getItem("fundooToken"));
    }

    return this.http.post(this.baseUrl+url, body, tokenRequired && this.headerOption);
  }
  
  get(url: string, tokenRequired: boolean = false) : Observable<any> {

    if(tokenRequired) {
      this.headerOption = this.createHttpOptions(localStorage.getItem("fundooToken"));
    }

    return this.http.get(this.baseUrl+url, tokenRequired && this.headerOption);
  }

  put(url: string, body, tokenRequired: boolean = false) : Observable<any> {

    if(tokenRequired) {
      this.headerOption = this.createHttpOptions(localStorage.getItem("fundooToken"));
    }

    return this.http.put(this.baseUrl+url, body, tokenRequired && this.headerOption);
  }

  delete(url: string, tokenRequired: boolean = false) : Observable<any> {

    if(tokenRequired) {
      this.headerOption = this.createHttpOptions(localStorage.getItem("fundooToken"));
    }

    return this.http.delete(this.baseUrl+url, tokenRequired && this.headerOption);
  }

}
