import { Injectable } from '@angular/core';

import { HttpServiceService } from '../services/http-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Label } from '../Model/label';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private http: HttpServiceService) { }

  createLabel(label: Label) {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.post("Label", label, true, httpOptions);
  }

  GetAllLabels() {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.get("Label", true, httpOptions);
  }

  GetNotesByLabelId(labelId: number) {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.get("Label/"+labelId, true, httpOptions);
  }

  deleteLabelById(labelId: number) {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.delete("Label/"+labelId, true, httpOptions);
  }

  private createHttpOptions(token: string) : any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer "+ token
      })
    };

    return httpOptions;
  }


}
