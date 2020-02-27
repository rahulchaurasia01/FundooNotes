import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Archivenote } from 'src/app/Model/archivenote';
import { NotesService } from '../../services/note/notes.service';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Imageupload } from 'src/app/Model/imageupload';

@Component({
  selector: 'app-noteicon',
  templateUrl: './noteicon.component.html',
  styleUrls: ['./noteicon.component.scss']
})
export class NoteiconComponent implements OnInit {

  @Input()
  grandParentIcon: string;

  @Input()
  grandParentNote:any;

  @Output()
  sendParentRefresh = new EventEmitter<number>();

  chckError: string;
  infoMsg: string;
  deleteText: string;
  deleteButtonText: string;
  Image: File;

  constructor(private note: NotesService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
  }

  sendMessageToParent(noteId: number) {
    this.sendParentRefresh.emit(noteId);
  }

  archiveUnarchiveTheNote(noteId: number, flag: boolean) {

    var archiveNote: Archivenote = {
      IsArchive: flag
    };

    this.note.archiveTheNote(noteId, archiveNote).
      subscribe(data => {
        if(data.status) {
          this.sendMessageToParent(noteId);
          if(flag)
            this.infoMsg = "Note archived";
          else
            this.infoMsg = "Note unarchived";
          this._snackBar.open(this.infoMsg, "Close", {
            duration: 5000,
          });
        }
        else {
          if(flag)
            this.infoMsg = "Unable to archived the Note";
          else
            this.infoMsg = "Unable to unarchived the Note";
          this._snackBar.open(this.infoMsg, "Close", {
            duration: 5000,
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

  sendToTrash(noteId: number) {

    this.note.deleteNote(noteId).
      subscribe(data => {
        if(data.status) {
          this.sendMessageToParent(noteId);
          this._snackBar.open("Note trashed", "Close", {
            duration: 5000,
          });
        }
        else {
          this._snackBar.open("Unable to trashed the note", "Close", {
            duration: 5000,
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

  restoreNote(noteId: number) {

    this.note.restoreTheNote(noteId).
      subscribe(data => {
        if(data.status) {
          this.sendMessageToParent(noteId);
          this._snackBar.open("Note restored", "Close", {
            duration: 5000,
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

  singleDeleteNote(noteId: number) {
    this.deleteText = "Delete note forever?";
    this.deleteButtonText = "Delete";
    this.openSingleDeleteDialog(noteId);
  }

  openSingleDeleteDialog(noteId: number): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data:  {
        type: "Note",
        deleteText: this.deleteText,
        deleteButtonText: this.deleteButtonText,
        noteId: noteId},
      
        panelClass: 'editLabelDialogContainer',
        width: '430px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.sendMessageToParent(noteId);
      }
      else if(result == false) {
        this._snackBar.open("Unable to delete the Note", "Close", {
          duration: 5000,
        });
      }
    });
  }

  onFileInput(files: File, noteId: number) : void {

    let file = <File>files[0];

    console.log(file);

    const filed: FormData = new FormData();
    filed.append("file", file);

    this.note.uploadNoteImage(noteId, file).
      subscribe(data => {
        if(!data.status) {
          this._snackBar.open(data.message, "Close", {
            duration: 5000,
          });
        }
        else {
          console.log(data.status);
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

}
