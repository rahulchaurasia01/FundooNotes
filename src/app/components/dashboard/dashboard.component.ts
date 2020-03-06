import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelsService } from '../../services/label/labels.service';
import { UserService } from '../../services/user/user.service';
import { LabeldataService } from '../../services/dataservice/labeldata.service';
import { MatDialog } from '@angular/material/dialog';
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
  fundooUserEmail: string;
  fundooUserName: string;
  chckError: string;
  labelBackground: string;
  profileImage: string;
  showSearch: boolean;
  showKeepIcon: boolean = false;
  showGridView: boolean;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _router: Router,
    private label: LabelsService, private _snackBar: MatSnackBar, private dialog: MatDialog,
    private labelData: LabeldataService, private user: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

    if(localStorage.getItem("fundooUserProfilePic") == "null") {
      this.profileImage = '';
    }
    else {
      this.profileImage = localStorage.getItem("fundooUserProfilePic");
    }

    this.GetAllLabels();

    this.showSearch = false;
    this.showKeepIcon = false;
    this.showGridView = false;

    this.labelData.currentLabelData.
      subscribe(data => {
        this.labels = data;
      })

    this.fundooUserEmail = localStorage.getItem("fundooUserEmail");
    this.fundooUserName = localStorage.getItem("fundooUserName");

    if(localStorage.getItem("fundooTitle")) {
      this.title = localStorage.getItem("fundooTitle");
      if(this.title != "Fundoo")
        this.showKeepIcon = true;
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ShowListView() {
    this.showGridView = true;
  }

  ShowGridView() {
    this.showGridView = false;
  }

  showSearchField() {
    this.showSearch = true;
  }

  openDialog(): void {
    this.dialog.open(EditlabelComponent, { panelClass: 'editLabelDialogContainer' });

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

  onLabelClick(labelName: string) {
    this.showKeepIcon = true;
    this.title= labelName;
    localStorage.setItem("fundooTitle", this.title);
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
        this.labelData.labelReceive(this.labels);
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

  onFileInput(imageFiles: File) : void {
    
    let file: File = <File>imageFiles[0];

    let filed = new FormData();
    filed.append("", file);

    this.user.AddProfilePic(filed).
      subscribe(data => {
        if(data.status) {
          this.profileImage = data.data.profilePic;
          localStorage.setItem("fundooUserProfilePic", this.profileImage);
        }
        else {
          this._snackBar.open(data.message, "Close", {
            duration: 3000,
          });
        }
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

  doLogout(): void {
    localStorage.removeItem("fundooToken");
    localStorage.removeItem("fundooTitle");
    localStorage.removeItem("fundooUserEmail");
    localStorage.removeItem("fundooUserName");
    localStorage.removeItem("fundooUserProfilePic");
    this._router.navigate(['login']);
  }

}
