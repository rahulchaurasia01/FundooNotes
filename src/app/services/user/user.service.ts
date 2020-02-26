import { Injectable } from '@angular/core';

import { HttpServiceService } from '../httpservice/http-service.service';
import { Login } from '../../Model/login';
import { Signup } from '../../Model/signup';
import { Forgetpassword } from '../../Model/forgetpassword';
import { Resetpassword } from '../../Model/resetpassword';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpServiceService) { }

  login(loginInformation: Login) {
    return this.httpService.post("User/Login", loginInformation);
  }

  register(signupInformation: Signup) {
    return this.httpService.post("User/Registration", signupInformation);
  }

  forgetPassword(forgetPasswordInformation: Forgetpassword) {
    return this.httpService.post("User/ForgetPassword", forgetPasswordInformation);
  }

  resetPassword(resetPasswordInformation: Resetpassword, token: string) {
    return this.httpService.post("User/ResetPassword", resetPasswordInformation, true);
  }


}
