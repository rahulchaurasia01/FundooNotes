import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpInformation: FormGroup;

  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit() {

    this.signUpInformation = new FormGroup( {
      firstName: new FormControl('', Validators.maxLength(12)),
      lastName: new FormControl('', Validators.maxLength(12)),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })

  }


  hasError(controlName: string, errorName: string) {
    return this.signUpInformation.controls[controlName].hasError(errorName);
  }


  goToSignInComponent() : void {
    this._router.navigate(["/login"]);
  }


}
