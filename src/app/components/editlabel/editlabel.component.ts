import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabeldataService } from '../../services/labeldata.service';
import { LabelsService } from '../../services/labels.service';
import { Label } from 'src/app/Model/label';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';

@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})
export class EditlabelComponent implements OnInit {

  labels=[];
  chckError: string
  newLabel: string;
  labelDeleteText: string;
  labelDeleteButton: string;

  constructor(public dialogRef: MatDialogRef<EditlabelComponent>, private labelDataService: LabeldataService,
    private label: LabelsService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.labelDataService.currentLabelData.
      subscribe(data => {
        this.labels = data;
      },
      error => {
        console.log(error);
      });
  }

  onClearLabelClick() {
    this.newLabel = '';
  }


  ondeleteLabelClick(labelId: number) {
    this.labelDeleteText = "We’ll delete this label and remove it from all of your Keep notes. Your notes won’t be deleted.";
    this.labelDeleteButton = "Delete";
    this.OpenLabelDeleteDialog(labelId);
  }

  OpenLabelDeleteDialog(labelId: number) {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data: {
        type: "Label",
        deleteText: this.labelDeleteText,
        deleteButtonText: this.labelDeleteButton,
        labelId: labelId
      },
      panelClass: 'editLabelDialogContainer',
      width: '430px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.labels = this.labels.filter(label => label.labelId !== labelId);
        this.labelDataService.labelReceive(this.labels);
      }
      else if(result == false) {
        this._snackBar.open("Unable to delete the label", "Close", {
          duration: 5000,
        });
      }
    });

  }

  oncreateLabelClick() {
    
    var label: Label = {
      Name: this.newLabel
    }

    this.label.createLabel(label).
      subscribe(data => {
        if(!data.status) {
          this._snackBar.open(data.message, "Close", {
            duration: 3000,
          });
        }
        else {
          this.labels.push(data.data);
          this.labelDataService.labelReceive(this.labels);
          this.newLabel = '';
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

  doneAddingLabel() {
    if(this.newLabel == "" || this.newLabel == null)
      this.dialogRef.close();
    else {
      this.oncreateLabelClick();
      this.dialogRef.close();
    }
  }

}
