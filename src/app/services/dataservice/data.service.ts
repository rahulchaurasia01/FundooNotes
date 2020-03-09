import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabeldataService {

  private labels=[];
  private userSelectedNote=[];
  private showListView: boolean = false;

  private labelData = new BehaviorSubject(this.labels);
  private userSelectedNoteData = new BehaviorSubject({
    Type: 'ActionNotPerformed',
    data: this.userSelectedNote
  });
  private showListViewData = new BehaviorSubject(this.showListView);


  currentLabelData = this.labelData.asObservable();
  currentUserSelectedNoteData = this.userSelectedNoteData.asObservable();
  currentDisplayView = this.showListViewData.asObservable();

  constructor() { }

  labelReceive(labels=[]) {
    this.labelData.next(labels)
  }

  userHasSelectNote(actionType: string, userData: any[]) {
    this.userSelectedNoteData.next({
      Type: actionType,
      data: userData
    });
  }

  UserChangedView(flag: boolean) {
    this.showListViewData.next(flag);
  }
   
}
