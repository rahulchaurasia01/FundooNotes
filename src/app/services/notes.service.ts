import { Injectable } from '@angular/core';

import { HttpServiceService } from '../services/http-service.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpServiceService) { }

  createHttpOptions(token: string) : any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer "+ token
      })
    };

    return httpOptions;
  }

  createNote(noteData: any) {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.post("Notes", noteData, true, httpOptions);
  }

  GetAllNotes() {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.get("Notes", true, httpOptions);
  }

  GetAllReminderNotes() {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.get("Notes/Reminder", true, httpOptions);
  }

  GetAllArchiveNotes() {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.get("Notes/Archive", true, httpOptions);
  }

  GetAllDeletedNotes() {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.get("Notes/Delete", true, httpOptions);
  }


}
