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
  notes=[];
  chckError: string;
  emptyNotesText: string;

  constructor(private note: NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.icon = "emoji_objects";
    this.emptyNotesText = "Notes you add appear here";
    this.GetAllNotes();

  }

  addNoteCreated($event) {
    if(!$event.isArchived)
      this.notes.push($event);
  }

  GetAllNotes() {
    this.note.GetAllNotes().
      subscribe(data => {
        if(data.status) 
          this.notes = data.data;
          console.log(this.notes);
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
