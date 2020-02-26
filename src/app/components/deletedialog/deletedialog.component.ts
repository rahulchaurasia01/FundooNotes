import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from '../../services/note/notes.service';
import { LabelsService } from '../../services/label/labels.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent implements OnInit {

  chckError: string;

  constructor(public dialogRef: MatDialogRef<DeletedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private note: NotesService,
    private _snackBar: MatSnackBar, private label: LabelsService) { }

  ngOnInit() {
  }

  deleteNote() {

    if (this.data.type == "Note") {
      if (this.data.noteId) {
        this.note.deleteNote(this.data.noteId).
          subscribe(data => {
            if (data.status)
              this.dialogRef.close(data.status);
            else
              this.dialogRef.close(data.status);
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
      else {
        if (!this.data.noOfNotes.length && this.data.noOfNotes.length <= 0) {
          this._snackBar.open("No Notes Present to Delete", "Close", {
            duration: 3000,
          });
          this.dialogRef.close();
          return;
        }
        this.note.bulkDeleteNote().
          subscribe(data => {
            if (data.status)
              this.dialogRef.close(data.status);
            else
              this.dialogRef.close(data.status);
          },
            error => {
              if (error.error.message)
                this.chckError = error.error.message;
              else
                this.chckError = "Connection to the Server Failed";

              this._snackBar.open(this.chckError, "Close", {
                duration: 3000,
              });

            });
      }
    }
    else if(this.data.type == "Label") {
      if (this.data.labelId) {
        this.label.deleteLabelById(this.data.labelId).
          subscribe(data => {
            if (data.status)
              this.dialogRef.close(data.status);
            else
              this.dialogRef.close(data.status);
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

  }

  cancelDeleteNote() {
    this.dialogRef.close();
  }

}
