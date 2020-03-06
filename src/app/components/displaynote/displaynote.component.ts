import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NotesService } from '../../services/note/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { Pinnote } from 'src/app/Model/pinnote';
import { NotedialogComponent } from '../notedialog/notedialog.component';
import { Updatenote } from 'src/app/Model/updatenote';
import { Notelabel } from 'src/app/Model/notelabel';
import { Listofnotelabel } from 'src/app/Model/listofnotelabel';

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {

  @Input() displayTitle: boolean;
  @Input() displayTitleText: string;
  @Input() displayNotes=[];
  @Input() parentIcon: string;
  @Input() emptyContentText: string;

  @Output() updatePinNoteInNotes = new EventEmitter<any>();
  @Output() updateUnPinNoteInNotes = new EventEmitter<any>();

  chckError: string;
  infoMsg: string;
  deleteText: string;
  deleteButtonText: string;
  displayFromIcon: string;
  selectedNoteBorder: string;
  mouseNote: number;
  flag: boolean;
  userSelectedNote=[];


  constructor(private note: NotesService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.displayFromIcon = "Display Note";
    this.mouseNote = -1;
    this.selectedNoteBorder = "2px solid black";
  }

  mouseNotOnNote() {
    this.mouseNote = -1;
  }

  mouseOnNote(noteId: number) {
    this.mouseNote = noteId;    
  }

  UserSelectedThisNote(note: any) {

    this.flag = false;

    if(this.userSelectedNote.length == 0)
      this.userSelectedNote.push(note);
    else {
      for(var noted = 0; noted < this.userSelectedNote.length; noted++) {
        if(this.userSelectedNote[noted].noteId == note.noteId) {
          this.flag = true;
          break;
        }
      }

      if(!this.flag)
        this.userSelectedNote.push(note);

    }
  }

  checkSelectedNote(noteId:number): boolean {

    for(var note = 0; note < this.userSelectedNote.length; note++) {
      if(this.userSelectedNote[note].noteId == noteId)
        return true;
    }

    return false;
  }

  recieveDataFromIconChild($event: any) {
    this.displayNotes = this.displayNotes.filter(note => note.noteId !== $event);
  }

  updateCollabToNote($event : any) {
    for(var note = 0; note < this.displayNotes.length; note++) {
      if(this.displayNotes[note].noteId == $event.noteId ) {
        this.displayNotes[note] = $event;
      }
    }
  }

  removeLabelForNote(labelId: number, noteId: number) {

    var updateNoteData: any;

    for(var note = 0; note < this.displayNotes.length; note++) {
      if(this.displayNotes[note].noteId == noteId) {
        this.displayNotes[note].labels = this.displayNotes[note].labels.
                            filter(label => label.labelId !== labelId);
        
        updateNoteData = this.displayNotes[note];
        break;
      }
    }

    var labels=[];

    for(var labeled=0; labeled < updateNoteData.labels.length; labeled++) {
      var labls: Notelabel = {
        LabelId: updateNoteData.labels[labeled].labelId
      };
      labels.push(labls);
    }

    var listLabel: Listofnotelabel = {
      Label: labels
    };

    this.note.AddLabelToNote(noteId, listLabel).
      subscribe(data => {
        if(!data.status) {
          this._snackBar.open("Unable to remove the label", "Close", {
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

  editNoteDialog(note: any) {
    const dialogRef =  this.dialog.open(NotedialogComponent, {
      data: {
        note: note
      },
      panelClass: 'editLabelDialogContainer',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        for(var note =0; note < this.displayNotes.length; note++) {
          if(this.displayNotes[note].noteId == result.noteId) {
            this.displayNotes[note] = result;
          }
        }

        this.displayNotes = this.displayNotes.filter(note => !note.isArchived )

      }
      
    });

  }

  UpdateNote($event) {
    for(var note = 0; note < this.displayNotes.length; note++) {
      if(this.displayNotes[note].noteId == $event.noteId) {
        this.displayNotes[note] = $event;
      }
    }
  }

  pinTheNote(noteId: number, flag: boolean) {

    var pinNote: Pinnote = {
      IsPin: flag
    }

    this.note.pinTheNote(noteId, pinNote).
      subscribe(data => {
        if(!data.status) {
          if(flag) 
            this.infoMsg = "Unable to Pin the Note";
          else
            this.infoMsg = "Unable to UnPin the Note";
          this._snackBar.open(this.infoMsg, "Close", {
            duration: 5000,
          });
        }
        else {
          this.displayNotes.forEach(element => {
            if(element.noteId == noteId) {
              element.isPin = flag
              if(flag) 
                this.updatePinNoteInNotes.emit(element);
              else
                this.updateUnPinNoteInNotes.emit(element);
              if(this.parentIcon == "archive") {
                element.isArchived = data.data.isArchived;
                this.displayNotes = this.displayNotes.filter(note => note.noteId !== noteId);
              }
            }
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

  bulkDelete() {
    this.deleteText = "Empty trash? All notes in Trash will be permanently deleted.";
    this.deleteButtonText = "Empty Trash";
    this.openBulkDeleteDialog()
  }

  openBulkDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data:  {
        type: "Note",
        deleteText: this.deleteText,
        deleteButtonText: this.deleteButtonText,
        noOfNotes: this.displayNotes.length
      },

      panelClass: 'editLabelDialogContainer',
      width: '430px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.displayNotes = [];
      }
      else if(result == false){
        this._snackBar.open("Unable to delete the Note", "Close", {
          duration: 5000,
        });
      }
    });
  }

}
