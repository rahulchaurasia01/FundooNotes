import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Archivenote } from 'src/app/Model/archivenote';
import { NotesService } from '../../services/note/notes.service';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelsService } from '../../services/label/labels.service';
import { CollaboratordialogComponent } from '../collaboratordialog/collaboratordialog.component';
import { LabeldataService } from '../../services/dataservice/labeldata.service';
import { Color } from 'src/app/Model/color';
import { Label } from 'src/app/Model/label';
import { Notelabel } from 'src/app/Model/notelabel';
import { Listofnotelabel } from 'src/app/Model/listofnotelabel';

@Component({
  selector: 'app-noteicon',
  templateUrl: './noteicon.component.html',
  styleUrls: ['./noteicon.component.scss']
})
export class NoteiconComponent implements OnInit {

  @Input() grandParentIcon: string;
  @Input() grandParentNote: any;
  @Input() accessFrom: string
  @Input() labelDataFromCreateNote: any;

  @Output() sendParentRefresh = new EventEmitter<number>();

  @Output() UpdateCollaboratorToCreateNote = new EventEmitter<any>();
  @Output() updateCollaboratorToDisplayNote = new EventEmitter<any>();

  @Output() UpdateColorInCreateNote = new EventEmitter<string>();
  @Output() UpdateImageInCreateNote = new EventEmitter<string>();

  @Output() UpdateNoteInDisplayNote = new EventEmitter<any>();
  @Output() UpdateNoteInEditNote = new EventEmitter<any>();

  @Output() UpdateArchiveInCreateNote = new EventEmitter<any>();
  @Output() UpdateArchiveInEditNote = new EventEmitter<any>();

  @Output() UpdateLabelsInCreateNote = new EventEmitter<any>();

  chckError: string;
  infoMsg: string;
  deleteText: string;
  deleteButtonText: string;
  Image: File;
  userSelectColor: string;
  labelClicked: boolean;
  hideCreateLabelDiv: boolean = false;
  dateTimeClicked: boolean;
  labelName: string;
  labels = [];
  labelsForCreateNote =[];

  isArchive: boolean;

  colors = [
    {
      code: "#fff",
      name: "Default"
    },
    {
      code: "#f28b82",
      name: "Red"
    },
    {
      code: "#fbbc04",
      name: "Orange"
    },
    {
      code: "#fff475",
      name: "Yellow"
    },
    {
      code: "#ccff90",
      name: "Green"
    },
    {
      code: "#a7ffeb",
      name: "Teal"
    },
    {
      code: "#cbf0f8",
      name: "Blue"
    },
    {
      code: "#aecbfa",
      name: "Dark Blue"
    },
    {
      code: "#d7aefb",
      name: "Purple"
    },
    {
      code: "#fdcfe8",
      name: "Pink"
    },
    {
      code: "#e6c9a8",
      name: "Brown"
    },
    {
      code: "#e8eaed",
      name: "Gray"
    }
  ];

  constructor(private note: NotesService, private _snackBar: MatSnackBar, private dialog: MatDialog,
    private labelData: LabeldataService, private label: LabelsService) { }

  ngOnInit() {

    this.isArchive = false;
    this.labelClicked = false;
    this.dateTimeClicked = false;

    this.labelData.currentLabelData.
      subscribe(data => {
        this.labels = data;
      })

    if (this.accessFrom == "Display Note")
      this.userSelectColor = this.grandParentNote.color;
    else if (this.accessFrom == "Create Note") {
      this.userSelectColor = "#fff";

    }
  }

  labelMenuClosed() {
    this.labelClicked = false;
  }


  setTonightReminder() {
    var date = new Date();
    console.log(date.getHours());
  }

  showDateTimePicker() {
    this.dateTimeClicked = true;
  }

  backToReminder() {
    this.dateTimeClicked = false;
  }

  checkLabelPresent(labelId: number): boolean {

    if (this.accessFrom == "Display Note" || this.accessFrom == "Edit Note") {

      for (var label = 0; label < this.grandParentNote.labels.length; label++) {
        if (this.grandParentNote.labels[label].labelId == labelId) {
          return true;
        }
      }

      return false;
    }
    else if(this.accessFrom == "Create Note") {

      if (this.labelsForCreateNote.length > 0) {
        for (var label = 0; label < this.labelDataFromCreateNote.length; label++) {
          if (this.labelsForCreateNote[label].labelId == labelId)
            return true;
        }
        return false;
      }
    }
    return false;
  }

  userSelectedLabel(label, checked) {

    if (this.accessFrom == "Display Note" || this.accessFrom == "Edit Note") {

      if (checked.checked)
        this.grandParentNote.labels.push(label);
      else
        this.grandParentNote.labels = this.grandParentNote.labels.
          filter(labeled => labeled.labelId !== label.labelId);

      var labels = [];

      for (var labeled = 0; labeled < this.grandParentNote.labels.length; labeled++) {
        var labls: Notelabel = {
          LabelId: this.grandParentNote.labels[labeled].labelId
        };
        labels.push(labls);
      }

      var listLabel: Listofnotelabel = {
        Label: labels
      };

      this.note.AddLabelToNote(this.grandParentNote.noteId, listLabel).
        subscribe(data => {
          if (!data.status) {
            this._snackBar.open(data.message, "Close", {
              duration: 3000,
            });
          }
          else {
            if (this.accessFrom == "Display Note") {
              this.UpdateNoteInDisplayNote.emit(this.grandParentNote);
            }
          }
        },
          error => {
            if (error.error.message)
              this.chckError = error.error.message;
            else
              this.chckError = "Connection to the Server Failed";

            this._snackBar.open(this.chckError, "Close", {
              duration: 3000,
            });
          })
    }
    else if(this.accessFrom == "Create Note") {

      if(checked.checked) {
        this.labelsForCreateNote.push(label);
        this.UpdateLabelsInCreateNote.emit(this.labelsForCreateNote);
      }
      else {
        this.labelsForCreateNote = this.labelsForCreateNote.
            filter(labeled => labeled.labelId !== label.labelId);
        
        this.UpdateLabelsInCreateNote.emit(this.labelsForCreateNote);
      }

    }
  }

  labelClickedByUser() {
    this.labelClicked = true;
  }

  newLabels(labelName: string) {

    this.labelData.currentLabelData.
      subscribe(data => {
        this.labels = data;
      })

    if (this.labelName != '') {
      this.labels = this.labels.filter(label => labelName == label.name);
      if (this.labels == null || this.labels.length <= 0)
        this.hideCreateLabelDiv = true;
      else
        this.hideCreateLabelDiv = false;
    }
    else
      this.hideCreateLabelDiv = false;

  }


  createNewLabel() {

    this.labelData.currentLabelData.
      subscribe(data => {
        this.labels = data;
      })

    var label: Label = {
      Name: this.labelName
    };

    this.label.createLabel(label).
      subscribe(data => {
        if (data.status) {
          this.labels.push(data.data);
          this.labelData.labelReceive(this.labels);
          this.labelName = '';
        }
        else {
          this._snackBar.open(data.message, "Close", {
            duration: 3000,
          });
        }
      },
        error => {
          if (error.error.message)
            this.chckError = error.error.message;
          else
            this.chckError = "Connection to the Server Failed";

          this._snackBar.open(this.chckError, "Close", {
            duration: 3000,
          });
        })


  }

  sendMessageToParent(noteId: number) {
    this.sendParentRefresh.emit(noteId);
  }

  userWantColorOnNote(noteId: number, color: string) {

    this.userSelectColor = color;

    if (this.accessFrom == "Display Note" || this.accessFrom == "Edit Note") {

      var colour: Color = {
        Color: color
      }

      this.note.updateColorToNote(noteId, colour).
        subscribe(data => {
          if (data.status) {
            if (this.accessFrom == "Display Note")
              this.UpdateNoteInDisplayNote.emit(data.data);
            else if (this.accessFrom == "Edit Note")
              this.UpdateNoteInEditNote.emit(data.data);
          }
          else {
            this._snackBar.open(data.message, "Close", {
              duration: 3000,
            });
          }
        },
          error => {
            if (error.error.message)
              this.chckError = error.error.message;
            else
              this.chckError = "Connection to the Server Failed";

            this._snackBar.open(this.chckError, "Close", {
              duration: 3000,
            });
          })
    }
    else if (this.accessFrom == "Create Note") {
      this.UpdateColorInCreateNote.emit(color);
    }
  }


  collaboratorClickedByUser() {

    const dialogRef = this.dialog.open(CollaboratordialogComponent, {

      data: {
        accessFrom: this.accessFrom,
        note: this.grandParentNote
      },

      panelClass: 'editLabelDialogContainer',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (this.accessFrom == "Create Note") {
          this.UpdateCollaboratorToCreateNote.emit(result);
        }
        else if (this.accessFrom == "Display Note") {
          this.updateCollaboratorToDisplayNote.emit(result);
        }
        else if (this.accessFrom == "Edit Note") {
          this.UpdateNoteInEditNote.emit(result);
        }
      }
    });


  }

  archiveUnarchiveTheNote(noteId: number, flag: boolean) {

    if (this.accessFrom == "Display Note" || this.accessFrom == "Edit Note") {

      var archiveNote: Archivenote = {
        IsArchive: flag
      };

      this.note.archiveTheNote(noteId, archiveNote).
        subscribe(data => {
          if (data.status) {
            if (this.accessFrom == "Display Note") {
              this.sendMessageToParent(noteId);
              if (flag)
                this.infoMsg = "Note archived";
              else
                this.infoMsg = "Note unarchived";
              this._snackBar.open(this.infoMsg, "Close", {
                duration: 5000,
              });
            }
            else if (this.accessFrom == "Edit Note") {
              this.UpdateArchiveInEditNote.emit(data.data);
            }
          }
          else {
            if (flag)
              this.infoMsg = "Unable to archived the Note";
            else
              this.infoMsg = "Unable to unarchived the Note";
            this._snackBar.open(this.infoMsg, "Close", {
              duration: 5000,
            });
          }
        },
          error => {
            if (error.error.message)
              this.chckError = error.error.message;
            else
              this.chckError = "Connection to the Server Failed";

            this._snackBar.open(this.chckError, "Close", {
              duration: 3000,
            });
          })
    }
    else if (this.accessFrom == "Create Note") {
      this.isArchive = flag;
      this.UpdateArchiveInCreateNote.emit(flag);
    }
  }

  sendToTrash(noteId: number) {

    this.note.deleteNote(noteId).
      subscribe(data => {
        if (data.status) {
          this.sendMessageToParent(noteId);
          this._snackBar.open("Note trashed", "Close", {
            duration: 5000,
          });
        }
        else {
          this._snackBar.open("Unable to trashed the note", "Close", {
            duration: 5000,
          });
        }
      },
        error => {
          if (error.error.message)
            this.chckError = error.error.message;
          else
            this.chckError = "Connection to the Server Failed";

          this._snackBar.open(this.chckError, "Close", {
            duration: 3000,
          });
        })
  }

  restoreNote(noteId: number) {

    this.note.restoreTheNote(noteId).
      subscribe(data => {
        if (data.status) {
          this.sendMessageToParent(noteId);
          this._snackBar.open("Note restored", "Close", {
            duration: 5000,
          });
        }
      },
        error => {
          if (error.error.message)
            this.chckError = error.error.message;
          else
            this.chckError = "Connection to the Server Failed";

          this._snackBar.open(this.chckError, "Close", {
            duration: 3000,
          });
        })
  }

  singleDeleteNote(noteId: number) {
    this.deleteText = "Delete note forever?";
    this.deleteButtonText = "Delete";
    this.openSingleDeleteDialog(noteId);
  }

  openSingleDeleteDialog(noteId: number): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data: {
        type: "Note",
        deleteText: this.deleteText,
        deleteButtonText: this.deleteButtonText,
        noteId: noteId
      },

      panelClass: 'editLabelDialogContainer',
      width: '430px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.sendMessageToParent(noteId);
      }
      else if (result == false) {
        this._snackBar.open("Unable to delete the Note", "Close", {
          duration: 5000,
        });
      }
    });
  }

  onFileInput(imageFiles: File, noteId: number): void {

    let file: File = <File>imageFiles[0];

    let filed = new FormData();
    filed.append("", file);

    if (this.accessFrom == "Display Note" || this.accessFrom == "Edit Note") {
      this.note.uploadNoteImage(noteId, filed).
        subscribe(data => {
          if (!data.status) {
            this._snackBar.open(data.message, "Close", {
              duration: 5000,
            });
          }
          else {
            if (this.accessFrom == "Display Note")
              this.UpdateNoteInDisplayNote.emit(data.data);
            else if (this.accessFrom == "Edit Note")
              this.UpdateNoteInEditNote.emit(data.data);
          }
        },
          error => {
            if (error.error.message)
              this.chckError = error.error.message;
            else
              this.chckError = "Connection to the Server Failed";

            this._snackBar.open(this.chckError, "Close", {
              duration: 3000,
            });
          })
    }
    else if (this.accessFrom == "Create Note") {
      this.note.uploadImageToCloudinary(filed).
        subscribe(data => {
          if (data.status)
            this.UpdateImageInCreateNote.emit(data.imagePath);
          else {
            this._snackBar.open(data.message, "Close", {
              duration: 5000,
            });
          }
        },
          error => {
            if (error.error.message)
              this.chckError = error.error.message;
            else
              this.chckError = "Connection to the Server Failed";

            this._snackBar.open(this.chckError, "Close", {
              duration: 3000,
            });
          })
    }
  }

}
