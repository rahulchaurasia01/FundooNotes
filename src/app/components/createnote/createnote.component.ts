import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.scss']
})
export class CreatenoteComponent implements OnInit {

  showTakeANoteAndAction: boolean;

  constructor() { }

  ngOnInit() {
    this.showTakeANoteAndAction = true;
  }

  NoteClick() {
    this.showTakeANoteAndAction = false;
  }

}
