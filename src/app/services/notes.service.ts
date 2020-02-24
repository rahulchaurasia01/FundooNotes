import { Injectable } from '@angular/core';

import { HttpServiceService } from '../services/http-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Archivenote } from '../Model/archivenote';
import { Pinnote } from '../Model/pinnote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpServiceService) { }

  private createHttpOptions(token: string) : any {
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

  bulkDeleteNote() {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.delete("Notes/BulkDelete", true, httpOptions);
  }

  deleteNote(noteId: number) {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.delete("Notes/"+noteId, true, httpOptions);
  }

  restoreTheNote(noteId: number) {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.put("Notes/Restore/"+noteId, null, true, httpOptions);
  }

  archiveTheNote(noteId: number, archiveNote: Archivenote) {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.put("Notes/" + noteId + "/Archive", archiveNote, true, httpOptions);
  }

  pinTheNote(noteId: number, pinNote: Pinnote) {
    const httpOptions = this.createHttpOptions(localStorage.getItem("fundooToken"));
    return this.http.put("Notes/"+ noteId + "/Pin", pinNote, true, httpOptions);
  }

}
