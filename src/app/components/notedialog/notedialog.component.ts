import { Component, OnInit, Inject } from '@angular/core';

import { NotesService } from '../../services/note/notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pinnote } from 'src/app/Model/pinnote';
import { Updatenote } from 'src/app/Model/updatenote';
import { Notelabel } from 'src/app/Model/notelabel';
import { Listofnotelabel } from 'src/app/Model/listofnotelabel';
import { Listofpinnote } from 'src/app/Model/listofpinnote';
import { Reminder } from 'src/app/Model/reminder';

@Component({
  selector: 'app-notedialog',
  templateUrl: './notedialog.component.html',
  styleUrls: ['./notedialog.component.scss']
})
export class NotedialogComponent implements OnInit {

  chckError: string;
  note: any;
  parentIcon: string;
  createNoteTitle: string;
  readonlyFlag: boolean;
  createNoteDesciption: string;

  AccessingFrom: string;

  constructor(public dialogRef: MatDialogRef<NotedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private notes: NotesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.AccessingFrom = "Edit Note";

    this.note = this.data.note;
    this.parentIcon = this.data.icon;

    if (this.parentIcon == "delete")
      this.readonlyFlag = true;
    else
      this.readonlyFlag = false;


    this.createNoteTitle = this.note.title;
    this.createNoteDesciption = this.note.description;
  }

  updateNoteInEditNote($event) {
    this.note = $event;
  }

  removeReminderFromNote() {
    var reminder: Reminder = {
      Reminder: null,
    }

    console.log(reminder);

    this.notes.AddReminderToNote(this.note.noteId, reminder).
      subscribe(data => {
        if (data.status) {
          this.note = data.data;
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

  removeLabelForDisplayNote(labelId: number) {
    this.note.labels = this.note.labels.filter(label => label.labelId !== labelId);

    var labels = [];

    for (var labeled = 0; labeled < this.note.labels.length; labeled++) {
      var labls: Notelabel = {
        LabelId: this.note.labels[labeled].labelId
      };
      labels.push(labls);
    }

    var listLabel: Listofnotelabel = {
      Label: labels
    };

    this.notes.AddLabelToNote(this.note.noteId, listLabel).
      subscribe(data => {
        if (!data.status) {
          this._snackBar.open("Unable to remove the label", "Close", {
            duration: 5000,
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

  updateArchive($event) {
    this.note = $event;
    this.dialogRef.close(this.note);
  }

  userPinnedTheNote(noteId: number, flag: boolean) {

    var pinNoted = [];

    var pinTheNote: Pinnote = {
      NoteId: noteId,
      IsPin: flag
    }

    pinNoted.push(pinTheNote);

    var pinNote: Listofpinnote = {
      PinnedNotes: pinNoted
    }


    this.notes.pinTheNote(pinNote).
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

    if (this.parentIcon != "delete") {

      if ((this.createNoteTitle != this.note.title) || (this.createNoteDesciption != this.note.description)) {

        this.note.title = this.createNoteTitle;
        this.note.description = this.createNoteDesciption

        var updateNote: Updatenote = {
          Title: this.note.title,
          Description: this.note.description
        }

        this.notes.updateNote(this.note.noteId, updateNote).
          subscribe(data => {
            if (!data.status) {
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
    }
    this.dialogRef.close(this.note);
  }

}
