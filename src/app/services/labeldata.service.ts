import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabeldataService {

  private labels=[];

  private labelData = new BehaviorSubject(this.labels);

  currentLabelData = this.labelData.asObservable();

  constructor() { }

  labelReceive(labels=[]) {
    this.labelData.next(labels)
  }
   
}
