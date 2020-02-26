import { Injectable } from '@angular/core';

import { HttpServiceService } from '../httpservice/http-service.service';
import { Label } from '../../Model/label';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private http: HttpServiceService) { }

  createLabel(label: Label) {
    return this.http.post("Label", label, true);
  }

  GetAllLabels() {
    return this.http.get("Label", true);
  }

  GetNotesByLabelId(labelId: number) {
    return this.http.get("Label/"+labelId, true);
  }

  updateLabelById(labelId: number, label: Label) {
    return this.http.put("Label/"+labelId, label, true);
  }

  deleteLabelById(labelId: number) {
    return this.http.delete("Label/"+labelId, true);
  }

}
