import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Createnote } from 'src/app/Model/createnote';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.scss']
})
export class CreatenoteComponent implements OnInit {

  chckError: string;
  showTakeANoteAndAction: boolean;
  hideNoteWithImagesDiv: boolean;
  createNoteTitle: string;
  createNoteDesciption: string;
  isPinned: boolean = false;
  isArchive: boolean = false;
  collaboratorClicked: boolean = true;
  userName: string;
  userEmail: string;
  newCollaborator: string;
  collaboratorUserList=[];
  tempCollaboratorUserList=[];

  @Output()
  noteCreated = new EventEmitter<any>();

  @ViewChild("collab") collabFocus: ElementRef;

  constructor(private note: NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.showTakeANoteAndAction = true;
    this.hideNoteWithImagesDiv = true;
    this.userName = localStorage.getItem("fundooUserName");
    this.userEmail = localStorage.getItem("fundooUserEmail");
  }

  sendMessageToParent(note: any) {
    this.noteCreated.emit(note);
  }

  NoteClick() {
    this.showTakeANoteAndAction = false;
    this.hideNoteWithImagesDiv = false;
  }

  collaboratorClickedByUser() {
    this.collaboratorClicked = false;
    this.tempCollaboratorUserList = this.collaboratorUserList;
  }

  cancelCollaboratorButtonClick() {
    console.log(this.tempCollaboratorUserList.length);
    this.tempCollaboratorUserList = [];
    console.log(this.tempCollaboratorUserList.length);
    this.newCollaborator = '';
    this.collaboratorClicked = true;
    console.log(this.collaboratorUserList.length);
  }

  addCollaboratorToArray() {
    this.tempCollaboratorUserList.push(this.newCollaborator);
    this.newCollaborator = '';
    this.collabFocus.nativeElement.focus();
  }

  saveCollaboratorButtonClick() {
    console.log("hola");
    this.collaboratorUserList = this.tempCollaboratorUserList;
    this.newCollaborator = '';
    this.collaboratorClicked = true;
  }

  

  deleteCollaboratedUser(user: string) {
    this.tempCollaboratorUserList = this.tempCollaboratorUserList.filter(users => users !== user);
  }

  userPinnedTheNote(flag: boolean) {
    this.isPinned = flag;
  }

  userArchiveTheNote(flag: boolean) {
    this.isArchive = flag;
  }

  closeButtonClick() {
    this.showTakeANoteAndAction = true;
    this.hideNoteWithImagesDiv = true;
    if((this.createNoteDesciption != null && this.createNoteDesciption != '') || 
            (this.createNoteTitle != null && this.createNoteTitle != ''))
    {
      var createNote: Createnote = {
        Title: this.createNoteTitle,
        Description: this.createNoteDesciption,
        Color: '',
        Image: '',
        IsPin: this.isPinned,
        IsArchived: this.isArchive,
        IsDeleted: false,
        Reminder: '',
        Label: null,
        Collaborators: null
      };

      this.note.createNote(createNote).
        subscribe(data => {
          if(data.status) {
            this.sendMessageToParent(data.data);
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
    this.createNoteDesciption ='';
    this.createNoteTitle = '';
    this.isPinned = false;
    this.isArchive = false;
  }

}
