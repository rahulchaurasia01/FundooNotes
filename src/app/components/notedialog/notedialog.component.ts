import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notedialog',
  templateUrl: './notedialog.component.html',
  styleUrls: ['./notedialog.component.scss']
})
export class NotedialogComponent implements OnInit {

  note: any;
  isPinned: boolean;
  isArchive: boolean;
  createNoteTitle: string;
  createNoteDesciption: string;

  constructor(public dialogRef: MatDialogRef<NotedialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.note = this.data.note;

    this.isPinned = this.note.isPin;
    this.createNoteTitle = this.note.title;
    this.createNoteDesciption = this.note.description;
    this.isArchive = this.note.isArchived;
  }

  userPinnedTheNote(flag: boolean) {
    this.isPinned = flag;
  }

  userArchiveTheNote(flag: boolean) {
    this.isArchive = flag;
  }

  closeButtonClick() {
    this.dialogRef.close();
  }

}
