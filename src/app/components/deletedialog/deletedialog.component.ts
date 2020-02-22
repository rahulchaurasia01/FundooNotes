import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotesService } from '../../services/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent implements OnInit {

  chckError: string;

  constructor( public dialogRef: MatDialogRef<DeletedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private note: NotesService,
    private _snackBar: MatSnackBar ) { }

  ngOnInit() {

    console.log(this.data.deleteText +" " + this.data.deleteButtonText +" "+ this.data.noteId);

  }

  deleteNote() {
    
    if(this.data.noteId) {
      this.note.deleteNote(this.data.noteId).
      subscribe(data => {
        if(data.status) 
          this.dialogRef.close(data.status);
        else
          this.dialogRef.close(data.status);
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
    else {
      this.note.bulkDeleteNote().
        subscribe(data => {
          if(data.status)
            this.dialogRef.close(data.status);
          else
            this.dialogRef.close(data.status);
        },
        error => {
          if(error.error.message)
            this.chckError = error.error.message;
          else
            this.chckError= "Connection to the Server Failed";
  
          this._snackBar.open(this.chckError, "Close", {
            duration: 3000,
          });
        });
    }

  }

  cancelDeleteNote() {
    this.dialogRef.close();
  }

}
