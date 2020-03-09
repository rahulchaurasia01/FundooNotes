import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NotesService } from '../../services/note/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { Pinnote } from 'src/app/Model/pinnote';
import { NotedialogComponent } from '../notedialog/notedialog.component';
import { LabeldataService } from '../../services/dataservice/data.service';
import { Notelabel } from 'src/app/Model/notelabel';
import { Listofnotelabel } from 'src/app/Model/listofnotelabel';
import { Listofpinnote } from 'src/app/Model/listofpinnote';

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

  @Output() updateArchiveInPinNotes = new EventEmitter<any>();
  @Output() updateArchiveInOtherNotes = new EventEmitter<any>();

  @Output() sendPinSelectedNoteToNotes = new EventEmitter<any>();
  @Output() sendUnPinSelectedNoteToNotes = new EventEmitter<any>();

  chckError: string;
  infoMsg: string;
  deleteText: string;
  deleteButtonText: string;
  displayFromIcon: string;
  selectedNoteBorder: string;
  mouseNote: number;
  flag: boolean;
  showListView: boolean = false;
  userPinSelectedNote=[];
  userUnPinSelectedNote=[];


  constructor(private note: NotesService, private _snackBar: MatSnackBar, private dialog: MatDialog,
    private dataService: LabeldataService) { }

  ngOnInit() {
    this.displayFromIcon = "Display Note";
    this.mouseNote = -1;
    this.selectedNoteBorder = "2px solid black";

    this.dataService.currentDisplayView.subscribe(data => {
      this.showListView = data;
    })

    this.dataService.currentUserSelectedNoteData.subscribe(data => {
      if((data.Type == "ActionNotPerformed") && (data.data.length == 0)) {
        this.userPinSelectedNote = [];
        this.userUnPinSelectedNote = [];
      }
      else {
        if ((data.Type == "ActionPerformed")) {

          if (data.data[0].isPin) {
            for (var dataNote = 0; dataNote < data.data.length; dataNote++) {
              for (var note = 0; note < this.displayNotes.length; note++) {
                if (data.data[dataNote].noteId == this.displayNotes[note].noteId) {
                  this.displayNotes[note] = data.data[dataNote]
                  this.updatePinNoteInNotes.emit(this.displayNotes[note]);
                }
              }
            }

          }
          else {
            for(var dataNote =0; dataNote < data.data.length; dataNote++ ) {
              for(var note = 0; note < this.displayNotes.length; note++) {
                if(data.data[dataNote].noteId == this.displayNotes[note].noteId) {
                  this.displayNotes[note] = data.data[dataNote]
                  this.updateUnPinNoteInNotes.emit(this.displayNotes[note]);
                }
              }
            }
            
          }
          this.userPinSelectedNote = [];
          this.userUnPinSelectedNote = [];
          this.sendPinSelectedNoteToNotes.emit(this.userPinSelectedNote);
          this.sendUnPinSelectedNoteToNotes.emit(this.userUnPinSelectedNote);
          this.dataService.userHasSelectNote("ActionNotPerformed", []);
          
        } 
      }
    })

  }

  mouseNotOnNote() {
    this.mouseNote = -1;
  }

  mouseOnNote(noteId: number) {
    this.mouseNote = noteId;    
  }

  UserSelectedThisNote(note: any) {

    this.flag = false;

    if (note.isPin) {

      if (this.userPinSelectedNote.length == 0) {
        this.userPinSelectedNote.push(note);
        this.sendPinSelectedNoteToNotes.emit(this.userPinSelectedNote);
      }
      else {
        for (var noted = 0; noted < this.userPinSelectedNote.length; noted++) {
          if (this.userPinSelectedNote[noted].noteId == note.noteId) {
            this.userPinSelectedNote = this.userPinSelectedNote.filter(noted => noted.noteId !== note.noteId);
            this.sendPinSelectedNoteToNotes.emit(this.userPinSelectedNote);
            this.flag = true;
            break;
          }
        }

        if (!this.flag) {
          this.userPinSelectedNote.push(note);
          this.sendPinSelectedNoteToNotes.emit(this.userPinSelectedNote);
        }

      }
    }
    else {
      if (this.userUnPinSelectedNote.length == 0) {
        this.userUnPinSelectedNote.push(note);
        this.sendUnPinSelectedNoteToNotes.emit(this.userUnPinSelectedNote);
      }
      else {
        for (var noted = 0; noted < this.userUnPinSelectedNote.length; noted++) {
          if (this.userUnPinSelectedNote[noted].noteId == note.noteId) {
            this.userUnPinSelectedNote = this.userUnPinSelectedNote.filter(noted => noted.noteId !== note.noteId);
            this.sendUnPinSelectedNoteToNotes.emit(this.userUnPinSelectedNote);
            this.flag = true;
            break;
          }
        }

        if (!this.flag) {
          this.userUnPinSelectedNote.push(note);
          this.sendUnPinSelectedNoteToNotes.emit(this.userUnPinSelectedNote);
        }
      }
    }
  }

  checkSelectedNote(note: any): boolean {

    if (note.isPin) {

      for (var noted = 0; noted < this.userPinSelectedNote.length; noted++) {
        if (this.userPinSelectedNote[noted].noteId == note.noteId)
          return true;
      }

      return false;
    }
    else {
      for (var noted = 0; noted < this.userUnPinSelectedNote.length; noted++) {
        if (this.userUnPinSelectedNote[noted].noteId == note.noteId)
          return true;
      }

      return false;
    }
  }

  recieveDataFromIconChild($event: any) {
    this.displayNotes = this.displayNotes.filter(note => note.noteId !== $event.noteId);
  }

  sendDatatoPinNotes($event: any) {

    this.displayNotes = this.displayNotes.filter(note => note.noteId !== $event.noteId);
    this.updateArchiveInPinNotes.emit($event);

  }

  sendDataToOtherNotes($event: any) {

    this.displayNotes = this.displayNotes.filter(note => note.noteId !== $event.noteId);
    this.updateArchiveInOtherNotes.emit($event);

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

    var pinNoted =[];

    var pinNote: Pinnote = {
      NoteId: noteId,
      IsPin: flag
    }

    pinNoted.push(pinNote);

    var pinNotes: Listofpinnote = {
      PinnedNotes: pinNoted
    }

    this.note.pinTheNote(pinNotes).
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
                element.isArchived = data.data[0].isArchived;
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
