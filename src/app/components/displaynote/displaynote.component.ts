import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../services/notes.service'

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {

  token: string;
  notes: any;

  constructor(private note: NotesService) { }

  ngOnInit() {

    this.token = localStorage.getItem("fundooToken");

    this.note.GetAllNotes(this.token).
      subscribe(data => {
        this.notes = data.data;
        console.log(data);
      },
      error => {
        console.log(error.error.message);
      })

  }

}
