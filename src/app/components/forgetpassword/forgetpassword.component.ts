import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Forgetpassword } from 'src/app/Model/forgetpassword';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  forgetPasswordInformation: FormGroup;
  chckError: string;

  constructor(private user: UserService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit() {

    if (localStorage.getItem("fundooToken"))
      this._router.navigate(['dashboard']);

    this.forgetPasswordInformation = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })

  }

  hasError(controlName: string, errorName: string) {
    return this.forgetPasswordInformation.controls[controlName].hasError(errorName);
  }

  forgetPassword(forgetPasswordData) {
    if (this.forgetPasswordInformation.valid)
      this.sendDataToServer(forgetPasswordData);
  }

  private sendDataToServer(forgetPasswordData) {
    var forgetPassword: Forgetpassword = {
      emailid: forgetPasswordData.email
    }

    this.user.forgetPassword(forgetPassword)
      .subscribe(data => {
        if (data.status) {
          this.forgetPasswordInformation.reset();
          this._snackBar.open(data.message, "Close", {
            duration: 3000,
          });
        }
        else {
          this._snackBar.open(data.message, "Close", {
            duration: 3000,
          });
        }
      },
        (error => {

          if (error.error.message)
            this.chckError = error.error.message;
          else
            this.chckError = "Connection to the Server Failed";

          this._snackBar.open(this.chckError, "Close", {
            duration: 3000,
          });
        }))

  }

}
