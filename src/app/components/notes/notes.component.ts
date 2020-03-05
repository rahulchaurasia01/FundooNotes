import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../services/note/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  icon: string;
  pinNotes=[];
  otherNotes=[];
  chckError: string;
  emptyNotesText: string;
  showPinTitle: boolean = false;
  pintitleText: string;
  showOtherTitle: boolean = false;
  otherTitleText: string;


  constructor(private note: NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.icon = "emoji_objects";
    this.emptyNotesText = "Notes you add appear here";
    this.GetAllNotes();

  }

  addNoteCreated($event) {
    if(!$event.isArchived && $event.isPin) {
      this.pinNotes = [$event, ...this.pinNotes];
      this.showPinTitle = true;
      this.pintitleText = "Pinned";
      this.showOtherTitle = true;
      this.otherTitleText = "Others"
    }
    else if(!$event.isArchived && !$event.isPin)
      this.otherNotes = [$event, ...this.otherNotes];
  }

  GetAllNotes() {
    this.note.GetAllNotes().
      subscribe(data => {
        if(data.status) {
          this.pinNotes = data.data.filter(note => note.isPin);

          if(this.pinNotes.length > 0) {
            this.showPinTitle = true;
            this.pintitleText = "Pinned";
            this.showOtherTitle = true;
            this.otherTitleText = "Others"
          }

          this.otherNotes = data.data.filter(note => !note.isPin);

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
