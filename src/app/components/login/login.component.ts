import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Login } from 'src/app/Model/login';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInformation: FormGroup;
  hide = true;

  constructor(private user: UserService, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginInformation = new FormGroup( {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })

  }

  hasError(controlName: string, errorName: string) {
    return this.loginInformation.controls[controlName].hasError(errorName);
  }

  loginData(userLoginData) : void {
    if(this.loginInformation.valid)
      this.sendDataToServer(userLoginData);
  }

  private sendDataToServer(userLoginData) {
    var login: Login = {
      EmailId: userLoginData.email,
      password: userLoginData.password
    }

    this.user.login(login)
      .subscribe(data => {
        localStorage.removeItem("fundooToken");
        localStorage.setItem("fundooToken", data.token);
        this._router.navigate(['dashboard']);
      },
      (error => {
        this._snackBar.open(error.error.message, "Close", {
          duration: 3000,
        });
      }))

  }

  onCreateAccountClick() : void {
    this._router.navigate(['/signup']);
  }

  onForgetPasswordClick(): void {
    this._router.navigate(['/forgetpassword']);
  }


}
