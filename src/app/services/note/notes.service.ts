import { Injectable } from '@angular/core';

import { HttpServiceService } from '../httpservice/http-service.service';
import { Archivenote } from '../../Model/archivenote';
import { Createnote } from '../../Model/createnote';
import { Listofcollaborator } from '../../Model/listofcollaborator';
import { Color } from 'src/app/Model/color';
import { Updatenote } from 'src/app/Model/updatenote';
import { Listofpinnote } from 'src/app/Model/listofpinnote';
import { Reminder } from 'src/app/Model/reminder';
import { Listofdeletenote } from 'src/app/Model/listofdeletenote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpServiceService) { }

  createNote(noteData: Createnote) {
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

  TrashNotes(deleteNote: Listofdeletenote) {
    return this.http.put("Notes/TrashNotes", deleteNote, true);
  }

  DeleteNotePermanently(deleteNote: Listofdeletenote) {
    return this.http.put("Notes/DeleteNotes", deleteNote, true);
  }

  uploadImageToCloudinary(file: FormData) {
    return this.http.putImage("Notes/UploadImage", file, true);
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

  pinTheNote(pinNote: Listofpinnote) {
    return this.http.put("Notes/Pin", pinNote, true);
  }

  uploadNoteImage(noteId: number, file: FormData) {
    return this.http.putImage("Notes/" + noteId + "/Image", file, true);
  }

  addCollaboratorToNote(noteId: number, collab: Listofcollaborator) {
    return this.http.put("Notes/" + noteId + "/Collaborator", collab, true);
  }

  updateColorToNote(noteId: number, color: Color) {
    return this.http.put("Notes/" + noteId + "/Color", color, true);
  }

  AddLabelToNote(noteId: number, label) {
    return this.http.put("Notes/Label/"+noteId, label, true);
  }

  AddReminderToNote(noteId: number, reminder: Reminder) {
    return this.http.put("Notes/"+noteId+"/Reminder", reminder, true);
  }

  RemoveImage(noteId: number) {
    return this.http.put("Notes/" + noteId + "/RemoveImage", null, true);
  }


}
