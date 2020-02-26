import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../services/note/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  deletedNotes=[];
  chckError: string;
  deleteIcon: string;
  emptyDeleteContentText: string;

  constructor(private notes: NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.deleteIcon = "delete";
    this.emptyDeleteContentText = "No notes in Trash";
    this.GetAllDeletedNotes();

  }

  GetAllDeletedNotes() {
    this.notes.GetAllDeletedNotes().
      subscribe(data => {
        if(data.status)
          this.deletedNotes = data.data;
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
