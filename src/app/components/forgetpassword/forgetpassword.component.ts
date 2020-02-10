import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  forgetPasswordInformation: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.forgetPasswordInformation = new FormGroup( {
      email: new FormControl('', [Validators.required, Validators.email])
    })

  }

  hasError(controlName: string, errorName: string) {
    return this.forgetPasswordInformation.controls[controlName].hasError(errorName);
  }


}
