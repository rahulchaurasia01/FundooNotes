import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../services/note/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  chckError: string;
  firedReminderNotes=[];
  upcomingReminderNotes=[];
  reminderIcon: string;
  emptyReminderText: string;

  constructor(private notes: NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.reminderIcon = "notification_important";
    this.emptyReminderText = "Notes with upcoming reminders appear here";
    this.GetAllReminderNotes();

  }


  GetAllReminderNotes() {
    this.notes.GetAllReminderNotes().
      subscribe(data => {
        if(data.status)
          this.firedReminderNotes = data.data.filter(note => note.reminder < Date.toString());
          console.log(this.firedReminderNotes);
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
