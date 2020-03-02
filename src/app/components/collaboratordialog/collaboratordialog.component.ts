import { Component, OnInit, ViewChild, ElementRef, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user/user.service';
import { NotesService } from '../../services/note/notes.service';
import { Alluser } from 'src/app/Model/alluser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Collaborator } from 'src/app/Model/collaborator';
import { Listofcollaborator } from 'src/app/Model/listofcollaborator';

@Component({
  selector: 'app-collaboratordialog',
  templateUrl: './collaboratordialog.component.html',
  styleUrls: ['./collaboratordialog.component.scss']
})
export class CollaboratordialogComponent implements OnInit {

  chckError: string;
  newCollaborator: string;
  userName: string;
  userEmail: string;
  UserData: any;
  listOfUser = [];
  tempCollaboratorUserListed = [];

  @ViewChild("collab") collabFocus: ElementRef;

  constructor(public dialogRef: MatDialogRef<CollaboratordialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _user: UserService,
    private _snackBar: MatSnackBar, private note: NotesService) { }

  ngOnInit() {

    this.userName = localStorage.getItem("fundooUserName");
    this.userEmail = localStorage.getItem("fundooUserEmail");

    if (this.data.accessFrom == "Display Note" || this.data.accessFrom == "Edit Note")
      this.tempCollaboratorUserListed = this.data.note.collaborators;
    else if (this.data.accessFrom == "Create Note") 
      this.tempCollaboratorUserListed = this.data.note;

  }

  newCollaborators(collab: string) {

    if (collab == "") {
      this.listOfUser = [];
    }


    if (collab != null && collab != "") {
      var userInital: Alluser = {
        EmailId: collab
      }

      this._user.GetAllUser(userInital).
        subscribe(data => {
          if (data.status) {
            this.listOfUser = [];
            this.listOfUser = data.data;
          }
          else {
            this.listOfUser = [];
          }
        },
          error => {
            if (error.error.message)
              this.chckError = error.error.message;
            else
              this.chckError = "Connection to the Server Failed";

            this._snackBar.open(this.chckError, "Close", {
              duration: 3000,
            });
          })
    }
  }

  deleteCollaboratedUser(user: any) {
    this.tempCollaboratorUserListed = this.tempCollaboratorUserListed.filter(users => users.emailId !== user.emailId);
  }

  cancelCollaboratorButtonClick() {
    this.tempCollaboratorUserListed = [];
    this.newCollaborator = '';
    this.dialogRef.close();
  }

  addCollaboratorToArray() {

    this.UserData = this.listOfUser.filter(user => user.emailId == this.newCollaborator);
    this.tempCollaboratorUserListed.push(this.UserData[0]);
    this.newCollaborator = '';
    this.collabFocus.nativeElement.focus();
  }

  saveCollaboratorButtonClick() {

    if (this.data.accessFrom == "Display Note" || this.data.accessFrom == "Edit Note") {
      var collaboratored = [];

      for (var user = 0; user < this.tempCollaboratorUserListed.length; user++) {
        var users: Collaborator = {
          UserId: this.tempCollaboratorUserListed[user].userId
        }
        collaboratored[user] = users;
      }

      var collaborators: Listofcollaborator = {
        Collaborators: collaboratored
      }

      this.note.addCollaboratorToNote(this.data.note.noteId, collaborators).
        subscribe(data => {
          if (data.status) {
            this.dialogRef.close(data.data);
          }
          else {
            this._snackBar.open(data.message, "Close", {
              duration: 3000,
            });
          }
        },
          error => {
            if (error.error.message)
              this.chckError = error.error.message;
            else
              this.chckError = "Connection to the Server Failed";

            this._snackBar.open(this.chckError, "Close", {
              duration: 3000,
            });
          })
    }
    else if(this.data.accessFrom == "Create Note") {
      this.dialogRef.close(this.tempCollaboratorUserListed);
    }
  }


}
