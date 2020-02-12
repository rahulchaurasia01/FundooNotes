import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Resetpassword } from 'src/app/Model/resetpassword';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  resetPasswordInformation: FormGroup
  newPasswordShow = true;
  confirmPasswordShow = true;
  token: string;

  constructor(private http: HttpClient, private _route: ActivatedRoute, private _router: Router, 
      private user: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.token = this._route.snapshot.params['token'];

    this.resetPasswordInformation = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  hasError(controlName: string, errorName: string) {
    return this.resetPasswordInformation.controls[controlName].hasError(errorName);
  }

  resetPassword(resetPasswordData) {
    if(resetPasswordData.newPassword != resetPasswordData.confirmPassword)
    {
        this._snackBar.open("Password Do Not Matches !!", "Close", {
          duration: 3000,
        });
    }
    else if(this.resetPasswordInformation.valid)
      this.sendDataToServer(resetPasswordData);
  }

  private sendDataToServer(resetPasswordData) {
    var resetPassword: Resetpassword = {
      password: resetPasswordData.newPassword
    }

    this.user.resetPassword(resetPassword, this.token).
      subscribe(data => {
        this._snackBar.open(data.message, "Close", {
          duration: 3000,
        });
        this.resetPasswordInformation.reset();
        this._router.navigate(['login']);
      }, 
      (error => {
        this._snackBar.open(error.error.message, "Close", {
          duration: 3000,
        });
      }))

  }

}
