import { Injectable } from '@angular/core';

import { HttpServiceService } from '../services/http-service.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private http: HttpServiceService) { }


  GetAllLabels() {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.get("Label", true, httpOptions);
  }

  GetNotesByLabelId(labelId: number) {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.get("Label/"+labelId, true, httpOptions);
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
