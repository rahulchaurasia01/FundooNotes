import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})
export class EditlabelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditlabelComponent>) { }

  ngOnInit() {
  }

  doneAddingLabel() {
    this.dialogRef.close();
  }

}
