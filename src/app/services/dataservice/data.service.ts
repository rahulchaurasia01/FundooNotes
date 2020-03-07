import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabeldataService {

  private labels=[];
  private userSelectedNote=[];

  private labelData = new BehaviorSubject(this.labels);
  private userSelectedNoteData = new BehaviorSubject(this.userSelectedNote);

  currentLabelData = this.labelData.asObservable();
  currentUserSelectedNoteData = this.userSelectedNoteData.asObservable();

  constructor() { }

  labelReceive(labels=[]) {
    this.labelData.next(labels)
  }

  userHasSelectNote(userSelectedNote=[]) {
    this.userSelectedNoteData.next(userSelectedNote);
  }
   
}
