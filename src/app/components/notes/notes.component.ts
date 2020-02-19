import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  token: string;

  constructor(private note: NotesService) { }

  ngOnInit() {

    this.token = localStorage.getItem("fundooToken");

    this.GetAllNotes(this.token);

  }

  GetAllNotes(token) {
    this.note.GetAllNotes(token).
      subscribe(data => {
        console.log(data);
      },
      error => {
        console.log(error.error.message);
      })
  }

}
