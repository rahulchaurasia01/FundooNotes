import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  token: string;
  icon: string;
  notes=[];
  emptyNotesText: string;

  constructor(private note: NotesService) { }

  ngOnInit() {

    this.token = localStorage.getItem("fundooToken");
    this.icon = "emoji_objects";
    this.emptyNotesText = "Notes you add appear here";
    this.GetAllNotes(this.token);

  }

  GetAllNotes(token) {
    this.note.GetAllNotes(token).
      subscribe(data => {
        this.notes = data.data;
      },
      error => {
        console.log(error.error.message);
      })
  }

}
