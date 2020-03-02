import { Component, OnInit, Inject } from '@angular/core';

import { NotesService } from '../../services/note/notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pinnote } from 'src/app/Model/pinnote';
import { Updatenote } from 'src/app/Model/updatenote';

@Component({
  selector: 'app-notedialog',
  templateUrl: './notedialog.component.html',
  styleUrls: ['./notedialog.component.scss']
})
export class NotedialogComponent implements OnInit {

  chckError: string;
  note: any;
  createNoteTitle: string;
  createNoteDesciption: string;

  AccessingFrom: string;

  constructor(public dialogRef: MatDialogRef<NotedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private notes: NotesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.AccessingFrom = "Edit Note";

    this.note = this.data.note;

    this.createNoteTitle = this.note.title;
    this.createNoteDesciption = this.note.description;
  }

  updateNoteInEditNote($event) {
    this.note = $event;
  }

  updateArchive($event) {
    this.note = $event;
    this.dialogRef.close(this.note);
  }

  userPinnedTheNote(noteId: number, flag: boolean) {


    var pinTheNote: Pinnote = {
      IsPin: flag
    }

    this.notes.pinTheNote(noteId, pinTheNote).
      subscribe(data => {
        if (data.status) {
          this.note.isPin = flag;
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

  closeButtonClick() {

    if ((this.createNoteTitle != this.note.title) || (this.createNoteDesciption != this.note.description)) {

      this.note.title = this.createNoteTitle;
      this.note.description = this.createNoteDesciption

      var updateNote: Updatenote = {
        Title: this.note.title,
        Description: this.note.description,
        Reminder: this.note.Reminder,
        Label: this.note.labels
      }

      this.notes.updateNote(this.note.noteId, updateNote).
        subscribe(data => {
          if(!data.status) {
            this._snackBar.open(this.chckError, "Close", {
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

    this.dialogRef.close(this.note);
  }

}
