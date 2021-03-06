import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/Model/signup';
import { UserService } from '../../services/user/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpInformation: FormGroup;
  hide = true;
  toggleErrorFlag = false;
  chckError: string;

  constructor(private user: UserService, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    if (localStorage.getItem("fundooToken"))
      this._router.navigate(['dashboard']);

    this.signUpInformation = new FormGroup({
      firstName: new FormControl('', Validators.maxLength(12)),
      lastName: new FormControl('', Validators.maxLength(12)),
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      conformPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      userType: new FormControl('', Validators.required)

    })

  }


  hasError(controlName: string, errorName: string) {
    if (controlName == "userType" && this.signUpInformation.controls["userType"].pristine)
      return false;
    return this.signUpInformation.controls[controlName].hasError(errorName);
  }

  onToggleSelected() {
    this.toggleErrorFlag = false;
  }


  signUpData(newAccountCreationData): void {

    if (newAccountCreationData.userType == "") {
      this.toggleErrorFlag = true
      return;
    }

    if (newAccountCreationData.password != newAccountCreationData.conformPassword) {
      this._snackBar.open("Password Does Not Matches !!", "Close", {
        duration: 3000,
      });
      return;
    }

    if (this.signUpInformation.valid)
      this.sendDataToServer(newAccountCreationData);
  }

  private sendDataToServer(newAccountCreationData) {
    var signup: Signup = {
      firstName: newAccountCreationData.firstName,
      lastName: newAccountCreationData.lastName,
      emailId: newAccountCreationData.userName,
      password: newAccountCreationData.password,
      type: newAccountCreationData.userType
    }

    this.user.register(signup)
      .subscribe(data => {
        if (data.status) {
          this._snackBar.open(data.message, "Close", {
            duration: 3000,
          });
          this._router.navigate(['login']);
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

  goToSignInComponent(): void {
    this._router.navigate(["/login"]);
  }


}
