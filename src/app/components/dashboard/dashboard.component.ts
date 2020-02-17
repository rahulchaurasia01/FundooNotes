import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onFileInput(event) : void {
    console.log(event.target.files[0]);
  }

  doLogout(): void {
    localStorage.removeItem("fundooToken")
    this._router.navigate(['login']);
    
  }

}