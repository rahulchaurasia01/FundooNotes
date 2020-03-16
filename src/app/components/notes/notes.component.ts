import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../services/note/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabeldataService } from '../../services/dataservice/data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  icon: string;
  pinNotes = [];
  otherNotes = [];
  chckError: string;
  emptyNotesText: string;
  showPinTitle: boolean = false;
  pintitleText: string;
  showOtherTitle: boolean = false;
  otherTitleText: string;
  userPinSelectedNote = [];
  userUnPinSelectedNote = [];
  userSelectedNote = [];


  constructor(private note: NotesService, private _snackBar: MatSnackBar, 
    private dataService: LabeldataService) { }

  ngOnInit() {

    this.icon = "emoji_objects";
    this.emptyNotesText = "Notes you add appear here";
    this.GetAllNotes();

  }


  updateDeletePinNote($event) {
    this.pinNotes = this.pinNotes.filter(note => note.noteId !== $event.noteId);
  }

  updateDeleteUnPinNote($event) {
    this.otherNotes = this.otherNotes.filter(note => note.noteId !== $event.noteId);
  }

  addNoteCreated($event) {
    if (!$event.isArchived && $event.isPin) {
      this.pinNotes = [$event, ...this.pinNotes];
      this.showPinTitle = true;
      this.pintitleText = "Pinned";
      this.showOtherTitle = true;
      this.otherTitleText = "Others"
    }
    else if (!$event.isArchived && !$event.isPin)
      this.otherNotes = [$event, ...this.otherNotes];

  }

  updateArchiveInPinNote($event) {

    this.pinNotes = this.pinNotes.filter(note => note.noteId !== $event.noteId)

    if (this.pinNotes.length == 0) {
      this.showOtherTitle = false;
      this.otherTitleText = "";
    }

  }

  updateArchiveInOtherNote($event) {
    this.otherNotes = this.otherNotes.filter(note => note.noteId !== $event.noteId);
  }

  addPinSelectedNote($event) {
    
    this.userSelectedNote = [];
    this.userPinSelectedNote = $event;

    if(this.userUnPinSelectedNote.length == 0) 
      this.userSelectedNote = [...this.userPinSelectedNote];
    else 
      this.userSelectedNote = [...this.userPinSelectedNote, ...this.userUnPinSelectedNote];

    this.dataService.userHasSelectNote("NoteActionNotPerformed", this.userSelectedNote);

  }

  addUnPinSelectedNote($event) {

    this.userUnPinSelectedNote = $event;
    this.userSelectedNote = [];

    if(this.userPinSelectedNote.length == 0) 
      this.userSelectedNote = [...this.userUnPinSelectedNote];
    else 
      this.userSelectedNote = [...this.userUnPinSelectedNote, ...this.userPinSelectedNote];

    this.dataService.userHasSelectNote("NoteActionNotPerformed", this.userSelectedNote);

  }

  updateUnPin($event) {
    this.pinNotes.forEach(note => {
      if (note.noteId == $event.noteId) {
        note = $event;
        this.otherNotes = [note, ...this.otherNotes];
      }
    })
    this.pinNotes = this.pinNotes.filter(note => note.noteId !== $event.noteId);
    if (this.pinNotes.length == 0) {
      this.showPinTitle = false;
      this.pintitleText = "";
      this.showOtherTitle = false;
      this.otherTitleText = "";
    }
  }

  updatePin($event) {
    this.otherNotes.forEach(note => {
      if (note.noteId == $event.noteId) {
        note = $event;
        this.pinNotes = [note, ...this.pinNotes];
      }
    })
    if (this.pinNotes.length > 0) {
      this.showPinTitle = true;
      this.pintitleText = "Pinned";
      this.showOtherTitle = true;
      this.otherTitleText = "Others";
    }
    this.otherNotes = this.otherNotes.filter(note => note.noteId !== $event.noteId);
  }

  GetAllNotes() {
    this.note.GetAllNotes().
      subscribe(data => {
        if (data.status) {
          this.pinNotes = data.data.filter(note => note.isPin);

          if (this.pinNotes.length > 0) {
            this.showPinTitle = true;
            this.pintitleText = "Pinned";
            this.showOtherTitle = true;
            this.otherTitleText = "Others"
          }

          this.otherNotes = data.data.filter(note => !note.isPin);

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
