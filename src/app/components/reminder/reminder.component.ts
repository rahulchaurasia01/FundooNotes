import { Component, OnInit } from '@angular/core';
import { LabeldataService } from '../../services/dataservice/data.service';
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
  showFiredTitle: boolean = false;
  firedtitleText: string;
  showUpComingTitle: boolean = false;
  upComingTitleText: string;
  userFiredSelectedNote = [];
  userUpComingSelectedNote = [];
  userSelectedNote = [];


  constructor(private notes: NotesService, private _snackBar: MatSnackBar,
    private dataService: LabeldataService) { }

  ngOnInit() {

    this.reminderIcon = "notification_important";
    this.emptyReminderText = "Notes with upcoming reminders appear here";
    this.GetAllReminderNotes();

  }

  addFiredSelectedNote($event) {
    this.userFiredSelectedNote = $event;

    if(this.userUpComingSelectedNote.length == 0) {
      this.userSelectedNote = [];
      this.userSelectedNote = [...this.userFiredSelectedNote];
    }
    else {
      this.userSelectedNote = [];
      this.userSelectedNote = [...this.userFiredSelectedNote, ...this.userUpComingSelectedNote];
    }
  
    this.dataService.userHasSelectNote("ReminderActionNotPerformed", this.userSelectedNote);

  }

  addUpComingSelectedNote($event) {
    this.userUpComingSelectedNote = $event;

    if(this.userFiredSelectedNote.length == 0) {
      this.userSelectedNote = [];
      this.userSelectedNote = [...this.userUpComingSelectedNote];
    }
    else {
      this.userSelectedNote = [];
      this.userSelectedNote = [...this.userUpComingSelectedNote, ...this.userFiredSelectedNote];
    }

    this.dataService.userHasSelectNote("ReminderActionNotPerformed", this.userSelectedNote);
  }

  updateUpcomingReminder($event) {

    this.firedReminderNotes = this.firedReminderNotes.filter(note => note.noteId !== $event.noteId);

    if(this.firedReminderNotes.length == 0) {
      this.showFiredTitle = true;
      this.firedtitleText = "Fired";
      this.showUpComingTitle = true;
      this.upComingTitleText = "Upcoming";
    }

    this.upcomingReminderNotes.push($event);
    this.showUpComingTitle = true;
    this.upComingTitleText = "Upcoming";
  }


  GetAllReminderNotes() {
    this.notes.GetAllReminderNotes().
      subscribe(data => {
        if(data.status)
          this.firedReminderNotes = data.data.filter(note => {
            var date = new Date(note.reminder);
            if(date < new Date())
              return true;
            else 
              return false;           
          });

          if (this.firedReminderNotes.length > 0) {
            this.showFiredTitle = true;
            this.firedtitleText = "Fired";
            this.showUpComingTitle = true;
            this.upComingTitleText = "Upcoming"
          }

          this.upcomingReminderNotes = data.data.filter(note => {
            var date = new Date(note.reminder);
            if(date > new Date())
              return true;
            else
              return false;
          })
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
