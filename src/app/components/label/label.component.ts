import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { LabelsService } from '../../services/label/labels.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  labelId: number;
  chckError: string;
  labelNotes=[];
  labelIcon: string;
  emptyLabelText: string;

  constructor(private routeParam: ActivatedRoute, private label: LabelsService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.routeParam.paramMap.subscribe(routerParmeter => {
      this.labelNotes = [];
      this.labelId = parseInt(routerParmeter.get("id"));
      this.GetNotesByLabelId(this.labelId);
    })

    this.labelIcon = "label";
    this.emptyLabelText = "No notes with this label yet";
    
  }


  GetNotesByLabelId(labelId) {
    this.label.GetNotesByLabelId(labelId).
      subscribe(data => {
        if(data.status) 
          this.labelNotes = data.data;
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
