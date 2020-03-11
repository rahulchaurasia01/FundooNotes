import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { LabelsService } from '../../services/label/labels.service';
import { LabeldataService } from '../../services/dataservice/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  labelId: number;
  chckError: string;
  labelIcon: string;
  emptyLabelText: string;
  pinLabelsNotes=[];
  otherLabelsNotes=[];
  showPinTitle: boolean = false;
  pintitleText: string;
  showOtherTitle: boolean = false;
  otherTitleText: string;
  userPinSelectedNote = [];
  userUnPinSelectedNote = [];
  userSelectedNote = [];

  constructor(private routeParam: ActivatedRoute, private label: LabelsService, private _snackBar: MatSnackBar,
    private dataService: LabeldataService) { }

  ngOnInit() {

    this.routeParam.paramMap.subscribe(routerParmeter => {
      this.pinLabelsNotes = [];
      this.otherLabelsNotes = [];
      this.labelId = parseInt(routerParmeter.get("id"));
      this.GetNotesByLabelId(this.labelId);
    })

    this.labelIcon = "label";
    this.emptyLabelText = "No notes with this label yet";
    
  }


  addPinSelectedNote($event) {
    this.userPinSelectedNote = $event;

    if(this.userUnPinSelectedNote.length == 0) {
      this.userSelectedNote = [];
      this.userSelectedNote = [...this.userPinSelectedNote];
    }
    else {
      this.userSelectedNote = [];
      this.userSelectedNote = [...this.userPinSelectedNote, ...this.userUnPinSelectedNote];
    }
  
    this.dataService.userHasSelectNote("ActionNotPerformed", this.userSelectedNote);

  }

  addUnPinSelectedNote($event) {
    this.userUnPinSelectedNote = $event;

    if(this.userPinSelectedNote.length == 0) {
      this.userSelectedNote = [];
      this.userSelectedNote = [...this.userUnPinSelectedNote];
    }
    else {
      this.userSelectedNote = [];
      this.userSelectedNote = [...this.userUnPinSelectedNote, ...this.userPinSelectedNote];
    }

    this.dataService.userHasSelectNote("ActionNotPerformed", this.userSelectedNote);
  }

  updateUnPin($event) {
    this.pinLabelsNotes.forEach(note => {
      if(note.noteId == $event.noteId) {
        note = $event;
        this.otherLabelsNotes = [note, ...this.otherLabelsNotes];
      }
    })
    this.pinLabelsNotes = this.pinLabelsNotes.filter(note => note.noteId !== $event.noteId);
    if(this.pinLabelsNotes.length == 0) {
      this.showPinTitle = false;
      this.pintitleText = "";
      this.showOtherTitle = false;
      this.otherTitleText = "";
    }
  }

  updatePin($event) {
    this.otherLabelsNotes.forEach(note => {
      if(note.noteId == $event.noteId) {
        note = $event;
        this.pinLabelsNotes = [note, ...this.pinLabelsNotes];
      }
    })
    if(this.pinLabelsNotes.length > 0) {
      this.showPinTitle = true;
      this.pintitleText = "Pinned";
      this.showOtherTitle = true;
      this.otherTitleText = "Others";
    }
    this.otherLabelsNotes = this.otherLabelsNotes.filter(note => note.noteId !== $event.noteId);
  }

  updateArchiveInPinNote($event) {

    this.pinLabelsNotes = this.pinLabelsNotes.filter(note => note.noteId !== $event.noteId)

    if (this.pinLabelsNotes.length == 0) {
      this.showOtherTitle = false;
      this.otherTitleText = "";
    }

  }

  updateArchiveInOtherNote($event) {
    this.otherLabelsNotes = this.otherLabelsNotes.filter(note => note.noteId !== $event.noteId);
  }


  GetNotesByLabelId(labelId) {
    this.label.GetNotesByLabelId(labelId).
      subscribe(data => {
        if(data.status) 
          this.pinLabelsNotes = data.data.filter(note => note.isPin);

          if(this.pinLabelsNotes.length > 0) {
            this.showPinTitle = true;
            this.pintitleText = "Pinned";
            this.showOtherTitle = true;
            this.otherTitleText = "Others"
          }

          this.otherLabelsNotes = data.data.filter(note => !note.isPin);

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
