import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabeldataService } from '../../services/dataservice/labeldata.service';
import { LabelsService } from '../../services/label/labels.service';
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
  hideLabelShowDelete: boolean;
  checkLabelId: number;
  editLabelClick: boolean;
  hideCloseButton: boolean;
  hideAddButton: boolean;

  @ViewChild("labelName") newLabelField: ElementRef;

  constructor(public dialogRef: MatDialogRef<EditlabelComponent>, private labelDataService: LabeldataService,
    private label: LabelsService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.editLabelClick = true;
    this.hideCloseButton = true;
    this.hideAddButton = false;
    this.labelDataService.currentLabelData.
      subscribe(data => {
        this.labels = data;
      },
      error => {
        console.log(error);
      });
  }

  onCloseLabelClick() {
    this.newLabel = '';
    this.editLabelClick = false;
    this.hideCloseButton = false;
    this.hideAddButton = true;
  }

  onAddLabelClick() {
    this.editLabelClick = true;
    this.hideCloseButton = true;
    this.hideAddButton = false;
    this.newLabelField.nativeElement.focus();
  }

  createNewLabel() {
    this.editLabelClick = true;
    this.hideAddButton = false;
    this.hideCloseButton = true;
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

  editLabelClicked(labelId: number) {
    this.editLabelClick = false;
    this.hideAddButton = true;
    this.hideCloseButton = false
    this.checkLabelId = labelId;
  }

  submitEditLabel(labelId: number, labelName: string) {
    
    var label: Label = {
      Name: labelName
    }

    this.label.updateLabelById(labelId, label).
      subscribe(data => {
        if(!data.status) {
          this._snackBar.open(data.message, "Close", {
            duration: 3000,
          });
        }
        else {
          this.checkLabelId = -1;
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
          this.newLabelField.nativeElement.focus();
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
