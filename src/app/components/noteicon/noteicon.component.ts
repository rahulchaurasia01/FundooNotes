import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Archivenote } from 'src/app/Model/archivenote';
import { NotesService } from '../../services/note/notes.service';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Imageupload } from 'src/app/Model/imageupload';
import { CollaboratordialogComponent } from '../collaboratordialog/collaboratordialog.component';

@Component({
  selector: 'app-noteicon',
  templateUrl: './noteicon.component.html',
  styleUrls: ['./noteicon.component.scss']
})
export class NoteiconComponent implements OnInit {

  @Input() grandParentIcon: string;
  @Input() grandParentNote: any;
  @Input() accessFrom: string

  @Output() sendParentRefresh = new EventEmitter<number>();
  @Output() UpdateCollaboratorToCreateNote = new EventEmitter<any>();
  @Output() updateCollaboratorToDisplayNote = new EventEmitter<any>();

  chckError: string;
  infoMsg: string;
  deleteText: string;
  deleteButtonText: string;
  Image: File;

  isArchive: boolean;
  

  constructor(private note: NotesService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.isArchive = false;
  }

  sendMessageToParent(noteId: number) {
    this.sendParentRefresh.emit(noteId);
  }

  collaboratorClickedByUser() {

    const dialogRef = this.dialog.open(CollaboratordialogComponent, {

      data: {
        accessFrom: this.accessFrom,
        note: this.grandParentNote
      },

      panelClass: 'editLabelDialogContainer',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (this.accessFrom == "Create Note") {
          console.log(result);
          this.UpdateCollaboratorToCreateNote.emit(result);
        }
        else if (this.accessFrom == "Display Note") {
          this.updateCollaboratorToDisplayNote.emit(result);
        }
      }
    });


  }

  archiveUnarchiveTheNote(noteId: number, flag: boolean) {

    if (this.accessFrom == "Display Note") {
    
      var archiveNote: Archivenote = {
        IsArchive: flag
      };

      this.note.archiveTheNote(noteId, archiveNote).
        subscribe(data => {
          if (data.status) {
            this.sendMessageToParent(noteId);
            if (flag)
              this.infoMsg = "Note archived";
            else
              this.infoMsg = "Note unarchived";
            this._snackBar.open(this.infoMsg, "Close", {
              duration: 5000,
            });
          }
          else {
            if (flag)
              this.infoMsg = "Unable to archived the Note";
            else
              this.infoMsg = "Unable to unarchived the Note";
            this._snackBar.open(this.infoMsg, "Close", {
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
    else if(this.accessFrom == "Create Note") {
      this.isArchive = flag;
    }
  }

  sendToTrash(noteId: number) {

    this.note.deleteNote(noteId).
      subscribe(data => {
        if (data.status) {
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
          if (error.error.message)
            this.chckError = error.error.message;
          else
            this.chckError = "Connection to the Server Failed";

          this._snackBar.open(this.chckError, "Close", {
            duration: 3000,
          });
        })
  }

  restoreNote(noteId: number) {

    this.note.restoreTheNote(noteId).
      subscribe(data => {
        if (data.status) {
          this.sendMessageToParent(noteId);
          this._snackBar.open("Note restored", "Close", {
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

  singleDeleteNote(noteId: number) {
    this.deleteText = "Delete note forever?";
    this.deleteButtonText = "Delete";
    this.openSingleDeleteDialog(noteId);
  }

  openSingleDeleteDialog(noteId: number): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data: {
        type: "Note",
        deleteText: this.deleteText,
        deleteButtonText: this.deleteButtonText,
        noteId: noteId
      },

      panelClass: 'editLabelDialogContainer',
      width: '430px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.sendMessageToParent(noteId);
      }
      else if (result == false) {
        this._snackBar.open("Unable to delete the Note", "Close", {
          duration: 5000,
        });
      }
    });
  }

  onFileInput(imageFiles: File, noteId: number): void {

    let file: File = <File>imageFiles[0];

    console.log(file);

    let filed = new FormData();
    filed.append("", file);

    this.note.uploadNoteImage(noteId, filed).
      subscribe(data => {
        if (!data.status) {
          this._snackBar.open(data.message, "Close", {
            duration: 5000,
          });
        }
        else {
          console.log(data.status);
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
