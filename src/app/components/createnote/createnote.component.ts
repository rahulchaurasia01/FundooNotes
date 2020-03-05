import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Createnote } from 'src/app/Model/createnote';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from '../../services/note/notes.service';
import { UserService } from '../../services/user/user.service';
import { Collaborator } from 'src/app/Model/collaborator';
import { Notelabel } from 'src/app/Model/notelabel';

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
  color: string;
  image: string;
  isPinned: boolean = false;
  isArchive: boolean;
  labels=[];
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
    this.isArchive = false;
    this.noteIconAccessFrom = "Create Note";
    this.color = "#fff";
    this.image = '';
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

  updateColor($event) {
    this.color = $event;
  }

  updateLabelInCreateNote($event) {
    this.labels = $event;
  }

  updateImageInCreateNote($event) {
    this.image = $event;
  }

  removeLabelForCreateNote(labeldId) {
    this.labels = this.labels.filter(label => label.labelId !== labeldId);
  }

  userPinnedTheNote(flag: boolean) {
    this.isPinned = flag;
  }

  updateArchiveInCreateNote($event) {
    this.isArchive = $event;
  }

  closeButtonClick() {
    this.showTakeANoteAndAction = true;
    this.hideNoteWithImagesDiv = true;

    var collaborator=[];
    var label=[];

    if ((this.createNoteDesciption != null && this.createNoteDesciption != '') ||
      (this.createNoteTitle != null && this.createNoteTitle != '')) {

        for (var user = 0; user < this.collaboratorUserList.length; user++) {
          var users: Collaborator = {
            UserId: this.collaboratorUserList[user].userId
          }
          collaborator[user] = users;
        }

        for(var labeled=0; labeled < this.labels.length; labeled++) {
          var lab: Notelabel ={
            LabelId: this.labels[labeled].labelId
          }
          label[labeled] = lab;
        }

      var createNote: Createnote = {
        Title: this.createNoteTitle,
        Description: this.createNoteDesciption,
        Color: this.color,
        Image: this.image,
        IsPin: this.isPinned,
        IsArchived: this.isArchive,
        IsDeleted: false,
        Reminder: '',
        Label: label,
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
    this.image = '';
    this.labels = [];
    this.collaboratorUserList = [];
    this.isPinned = false;
    this.isArchive = false;
    this.color = "#fff";
  }

}
