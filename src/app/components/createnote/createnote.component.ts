import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Createnote } from 'src/app/Model/createnote';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.scss']
})
export class CreatenoteComponent implements OnInit {

  chckError: string;
  showTakeANoteAndAction: boolean;
  createNoteTitle: string;
  createNoteDesciption: string;
  isPinned: boolean = false;
  isArchive: boolean = false;

  @Output()
  noteCreated = new EventEmitter<any>();

  constructor(private note: NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.showTakeANoteAndAction = true;
  }

  sendMessageToParent(note: any) {
    this.noteCreated.emit(note);
  }

  NoteClick() {
    this.showTakeANoteAndAction = false;
  }

  userPinnedTheNote(flag: boolean) {
    this.isPinned = flag;
  }

  userArchiveTheNote(flag: boolean) {
    this.isArchive = flag;
  }

  closeButtonClick() {
    this.showTakeANoteAndAction = true;
    if((this.createNoteDesciption != null && this.createNoteDesciption != '') || 
            (this.createNoteTitle != null && this.createNoteTitle != ''))
    {
      var createNote: Createnote = {
        Title: this.createNoteTitle,
        Description: this.createNoteDesciption,
        Color: '',
        Image: '',
        IsPin: this.isPinned,
        IsArchived: this.isArchive,
        IsDeleted: false,
        Reminder: '',
        Label: null,
        Collaborators: null
      };

      this.note.createNote(createNote).
        subscribe(data => {
          if(data.status) {
            this.sendMessageToParent(data.data);
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
    this.createNoteDesciption ='';
    this.createNoteTitle = '';
    this.isPinned = false;
    this.isArchive = false;
  }

}
