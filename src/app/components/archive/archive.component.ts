import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../services/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  token: string;
  archiveNotes=[];
  archiveIcon: string;
  emptyArchiveContent: string;
  chckError: string;

  constructor(private notes: NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.token = localStorage.getItem("fundooToken");
    this.archiveIcon = "archive";
    this.emptyArchiveContent = "Your archived notes appear here";

    this.GetAllArchiveNotes(this.token);

  }


  GetAllArchiveNotes(token) {
    this.notes.GetAllArchiveNotes(token).
      subscribe(data => {
        if(data.status)
          this.archiveNotes = data.data;
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
