import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {

  @Input() displayNotes: any;

  @Input() parentIcon: string;

  @Input() emptyContentText: string;

  constructor() { }

  ngOnInit() {

  }

}
