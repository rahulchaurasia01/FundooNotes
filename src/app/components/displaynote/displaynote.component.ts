import { Component, OnInit, Input } from '@angular/core';

import { NotesService } from '../../services/notes.service';
import { Archivenote } from 'src/app/Model/archivenote';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {

  @Input() displayNotes=[];
  @Input() parentIcon: string;
  @Input() emptyContentText: string;

  chckError: string;
  infoMsg: string;
  deleteText: string;
  deleteButtonText: string;

  constructor(private note: NotesService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {

  }

  singleDeleteNote(noteId: number) {
    this.deleteText = "Delete note forever?";
    this.deleteButtonText = "Delete";
    this.openSingleDeleteDialog(noteId);
  }

  bulkDelete() {
    this.deleteText = "Empty trash? All notes in Trash will be permanently deleted.";
    this.deleteButtonText = "Empty Trash";
    this.openBulkDeleteDialog()
  }

  openSingleDeleteDialog(noteId: number): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data:  {deleteText: this.deleteText,
         deleteButtonText: this.deleteButtonText,
         noteId: noteId},
      
         panelClass: 'editLabelDialogContainer',
         width: '430px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.displayNotes = this.displayNotes.filter(note => note.noteId !== noteId);
      }
      else {
        this._snackBar.open("Unable to delete the Note", "Close", {
          duration: 5000,
        });
      }
    });
  }

  openBulkDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data:  {deleteText: this.deleteText,
         deleteButtonText: this.deleteButtonText},

         panelClass: 'editLabelDialogContainer',
         width: '430px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.displayNotes = [];
      }
      else {
        this._snackBar.open("Unable to delete the Note", "Close", {
          duration: 5000,
        });
      }
    });
  }

  archiveUnarchiveTheNote(noteId: number, flag: boolean) {

    var archiveNote: Archivenote = {
      IsArchive: flag
    };

    this.note.archiveTheNote(noteId, archiveNote).
      subscribe(data => {
        if(data.status) {
          this.displayNotes = this.displayNotes.filter(noted => noted.noteId !== noteId);
        
        if(flag)
          this.infoMsg = "Note archived";
        else
          this.infoMsg = "Note unarchived";
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

  restoreNote(noteId: number) {
    this.note.restoreTheNote(noteId).
      subscribe(data => {
        if(data.status) {
          this.displayNotes = this.displayNotes.filter(noted => noted.noteId !== noteId);

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

}
