import { Injectable } from '@angular/core';

import { HttpServiceService } from '../httpservice/http-service.service';
import { Archivenote } from '../../Model/archivenote';
import { Pinnote } from '../../Model/pinnote';
import { Createnote } from '../../Model/createnote';
import { Listofcollaborator } from '../../Model/listofcollaborator';
import { Color } from 'src/app/Model/color';
import { Updatenote } from 'src/app/Model/updatenote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpServiceService) { }

  createNote(noteData: Createnote) {
    console.log(noteData);
    return this.http.post("Notes", noteData, true);
  }

  GetAllNotes() {
    return this.http.get("Notes", true);
  }

  GetAllReminderNotes() {
    return this.http.get("Notes/Reminder", true);
  }

  GetAllArchiveNotes() {
    return this.http.get("Notes/Archive", true);
  }

  GetAllDeletedNotes() {
    return this.http.get("Notes/Delete", true);
  }

  bulkDeleteNote() {
    return this.http.delete("Notes/BulkDelete", true);
  }

  deleteNote(noteId: number) {
    return this.http.delete("Notes/"+noteId, true);
  }

  restoreTheNote(noteId: number) {
    return this.http.put("Notes/Restore/"+noteId, null, true);
  }
  
  updateNote(noteId: number, updateTheNote: Updatenote) {
    return this.http.put("Notes/" + noteId, updateTheNote, true);
  }

  archiveTheNote(noteId: number, archiveNote: Archivenote) {
    return this.http.put("Notes/" + noteId + "/Archive", archiveNote, true);
  }

  pinTheNote(noteId: number, pinNote: Pinnote) {
    return this.http.put("Notes/"+ noteId + "/Pin", pinNote, true);
  }

  uploadNoteImage(noteId: number, file) {
    return this.http.putImage("Notes/" + noteId + "/Image", file, true);
  }

  addCollaboratorToNote(noteId: number, collab: Listofcollaborator) {
    return this.http.put("Notes/" + noteId + "/Collaborator", collab, true);
  }

  updateColorToNote(noteId: number, color: Color) {
    return this.http.put("Notes/" + noteId + "/Color", color, true);
  }


}
