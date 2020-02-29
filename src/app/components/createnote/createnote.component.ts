import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Createnote } from 'src/app/Model/createnote';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from '../../services/note/notes.service';
import { UserService } from '../../services/user/user.service';
import { Alluser } from 'src/app/Model/alluser';
import { Collaborator } from 'src/app/Model/collaborator';

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
  noteIconAccessFrom: string;
  collaboratorUserList=[];


  @Output()
  noteCreated = new EventEmitter<any>();

  @ViewChild("collab") collabFocus: ElementRef;

  constructor(private note: NotesService, private _snackBar: MatSnackBar, private _user: UserService) { }

  ngOnInit() {
    this.showTakeANoteAndAction = true;
    this.hideNoteWithImagesDiv = true;
    this.noteIconAccessFrom = "Create Note";
  }

  sendMessageToParent(note: any) {
    this.noteCreated.emit(note);
  }

  updateCollabToCreateNote($event: any) {
    this.collaboratorUserList = $event;
  }

  NoteClick() {
    this.showTakeANoteAndAction = false;
    this.hideNoteWithImagesDiv = false;
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

    var collaborator=[];

    if ((this.createNoteDesciption != null && this.createNoteDesciption != '') ||
      (this.createNoteTitle != null && this.createNoteTitle != '')) {
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
        Collaborators: collaborator
      };

      this.note.createNote(createNote).
        subscribe(data => {
          if (data.status) {
            this.sendMessageToParent(data.data);
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
    this.createNoteDesciption = '';
    this.createNoteTitle = '';
    this.isPinned = false;
    this.isArchive = false;
  }

}
