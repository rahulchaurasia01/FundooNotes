import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { HttpServiceService } from './http-service.service';
import { Login } from '../Model/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private httpService: HttpServiceService) { }

  login(loginInformation: Login) {
    return this.httpService.post("User/Login", loginInformation);
  }

}
