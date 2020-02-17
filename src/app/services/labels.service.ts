import { Injectable } from '@angular/core';

import { HttpServiceService } from '../services/http-service.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private http: HttpServiceService) { }


  GetAllLabels(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer "+ token
      })
    };
    return this.http.get("Label", true, httpOptions);
  }

}
