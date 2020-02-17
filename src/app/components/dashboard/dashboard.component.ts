import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelsService } from '../../services/labels.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  labels: any;
  token: string;
  title: string = "Keep";

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _router: Router,
    private label: LabelsService, private _snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.token = localStorage.getItem("fundooToken");
    this.GetAllLabels(this.token);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  GetAllLabels(token) : any {
    this.label.GetAllLabels(token).
      subscribe(data => {
        this.labels = data.data; 
      },
      error => {
        this._snackBar.open(error.error.message, "Close", {
          duration: 3000,
        });
      })
  }

  onFileInput(event) : void {
    console.log(event.target.files[0]);
  }

  doLogout(): void {
    localStorage.removeItem("fundooToken")
    this._router.navigate(['login']);
  }

}
