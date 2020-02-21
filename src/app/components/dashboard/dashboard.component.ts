import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelsService } from '../../services/labels.service';
import {MatDialog } from '@angular/material/dialog';
import { EditlabelComponent } from '../editlabel/editlabel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  labels: any;
  title: string = "Fundoo";
  chckError: string;
  labelBackground: string;
  showSearch: boolean;
  showKeepIcon: boolean = false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _router: Router,
    private label: LabelsService, private _snackBar: MatSnackBar, private dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.GetAllLabels();
    this.showSearch = false;
    this.showKeepIcon = false;

    if(localStorage.getItem("fundooTitle")) {
      this.title = localStorage.getItem("fundooTitle");
      if(this.title != "Fundoo")
        this.showKeepIcon = true;
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  showSearchField() {
    this.showSearch = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditlabelComponent, { panelClass: 'editLabelDialogContainer' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  notesClick() {
    this.showKeepIcon = false;
    this.title = "Fundoo";
    localStorage.setItem("fundooTitle", this.title);
  }

  reminderClick() {
    this.showKeepIcon = true;
    this.title = "Reminder";
    localStorage.setItem("fundooTitle", this.title);
  }

  onLabelClick(labelId: number, labelName: string) {
    this.showKeepIcon = true;
    this.title= labelName;
    localStorage.setItem("fundooTitle", this.title);
    this.labelBackground = "active";
    this._router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
      this._router.navigate(['dashboard/label/', labelId]);
    }); 
  }

  archiveClick() {
    this.showKeepIcon = true;
    this.title = "Archive";
    localStorage.setItem("fundooTitle", this.title);
  }

  deleteClick() {
    this.showKeepIcon = true;
    this.title = "Trash";
    localStorage.setItem("fundooTitle", this.title);
  }

  GetAllLabels() : any {
    this.label.GetAllLabels().
      subscribe(data => {
        this.labels = data.data; 
      },
      error => {

        if(error.error.message)
            this.chckError = error.error.message;
          else
            this.chckError= "Connection to the Server Failed";

        this._snackBar.open(this.chckError, "Close", {
          duration: 3000,
        });
      })
  }

  onFileInput(event) : void {
    console.log(event.target.files[0]);
  }

  doLogout(): void {
    localStorage.removeItem("fundooToken");
    localStorage.removeItem("fundooTitle");
    this._router.navigate(['login']);
  }

}
