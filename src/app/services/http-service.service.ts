import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Archivenote } from '../Model/archivenote';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private baseUrl: string = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  post(url, body, tokenRequired: boolean = false, headerOption = null) : Observable<any> {
    return this.http.post(this.baseUrl+url, body, tokenRequired && headerOption);
  }
  
  get(url: string, tokenRequired: boolean = false, headerOption = null) : Observable<any> {
    return this.http.get(this.baseUrl+url, tokenRequired && headerOption);
  }

  put(url: string, body, tokenRequired: boolean = false, headerOption = null) : Observable<any> {
    return this.http.put(this.baseUrl+url, body, tokenRequired && headerOption);
  }

  delete(url: string, tokenRequired: boolean = false, headerOption = null) : Observable<any> {
    return this.http.delete(this.baseUrl+url, tokenRequired && headerOption);
  }

}
