import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelsService } from '../../services/label/labels.service';
import { UserService } from '../../services/user/user.service';
import { NotesService } from '../../services/note/notes.service';
import { LabeldataService } from '../../services/dataservice/data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { Pinnote } from 'src/app/Model/pinnote';
import { Listofpinnote } from 'src/app/Model/listofpinnote';
import { Deletenote } from 'src/app/Model/deletenote';
import { Listofdeletenote } from 'src/app/Model/listofdeletenote';
import { Archivenote } from 'src/app/Model/archivenote';
import { Listofarchivenote } from 'src/app/Model/listofarchivenote';
import { Color } from 'src/app/Model/color';
import { Listofcolornote } from 'src/app/Model/listofcolornote';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  labels: any;
  title: string = "Fundoo";
  fundooUserEmail: string;
  fundooUserName: string;
  chckError: string;
  labelBackground: string;
  profileImage: string;
  showSearch: boolean;
  showKeepIcon: boolean = false;
  showGridView: boolean;
  showPin: boolean;
  showArchive: boolean;
  componentType: string;
  notificationMessage: any;
  UserSelectedNote = [];

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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _router: Router,
    private label: LabelsService, private _snackBar: MatSnackBar, private dialog: MatDialog,
    private dataServices: LabeldataService, private user: UserService, private note: NotesService,
    private notification: NotificationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

    this.notification.requestPermission();
    this.notification.receiveMessage();
    this.notificationMessage = this.notification.currentMessage;

    if (localStorage.getItem("fundooUserProfilePic") == "null") {
      this.profileImage = '';
    }
    else {
      this.profileImage = localStorage.getItem("fundooUserProfilePic");
    }

    this.GetAllLabels();

    this.showSearch = false;
    this.showKeepIcon = false;
    this.showGridView = false;

    this.dataServices.currentLabelData.
      subscribe(data => {
        this.labels = data;
      })

    this.dataServices.currentUserSelectedNoteData.
      subscribe(data => {
        this.UserSelectedNote = data.data;
        this.componentType = data.Type;

        if (this.UserSelectedNote.filter(note => !note.isPin).length > 0) {
          this.showPin = false;
        }
        else {
          this.showPin = true;
        }

        if (this.UserSelectedNote.filter(note => !note.isArchived).length > 0) {
          this.showArchive = false;
        }
        else {
          this.showArchive = true;
        }


      })

    this.fundooUserEmail = localStorage.getItem("fundooUserEmail");
    this.fundooUserName = localStorage.getItem("fundooUserName");

    if (localStorage.getItem("fundooTitle")) {
      this.title = localStorage.getItem("fundooTitle");
      if (this.title != "Fundoo")
        this.showKeepIcon = true;
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  deselectAllNote() {
    this.UserSelectedNote = [];
    this.dataServices.userHasSelectNote("ActionNotPerformed", this.UserSelectedNote);
  }

  pinUnPinAllTheSelectedNote(flag: boolean) {

    var pinNoted = [];

    for (var note = 0; note < this.UserSelectedNote.length; note++) {
      var pinNote: Pinnote = {
        NoteId: this.UserSelectedNote[note].noteId,
        IsPin: flag
      };
      pinNoted.push(pinNote);
    }

    var pinNotes: Listofpinnote = {
      PinnedNotes: pinNoted
    };

    this.note.pinTheNote(pinNotes).
      subscribe(data => {
        if (data.status) {
          this.UserSelectedNote = [...data.data];
          if (this.componentType == "NoteActionNotPerformed")
            this.dataServices.userHasSelectNote("NotePinActionPerformed", this.UserSelectedNote);
          else if (this.componentType == "ReminderActionNotPerformed")
            this.dataServices.userHasSelectNote("ReminderPinActionPerformed", this.UserSelectedNote);
          else if (this.componentType == "LabelActionNotPerformed")
            this.dataServices.userHasSelectNote("LabelPinActionPerformed", this.UserSelectedNote);
          else if (this.componentType == "ArchiveActionNotPerformed") {
            this.dataServices.userHasSelectNote("ArchivePinActionPerformed", this.UserSelectedNote);
          }
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

  colorTheSelectedNote(color: string) {

    var colours = [];

    for(var selectedNote = 0; selectedNote < this.UserSelectedNote.length; selectedNote++) {
      var colorNote: Color = {
        NoteId: this.UserSelectedNote[selectedNote].noteId,
        Color: color
      }

      colours.push(colorNote);
    }

    var colors: Listofcolornote = {
      ColorNotes: colours
    };

    this.note.updateColorToNote(colors).
      subscribe(data => {
        if(data.status) {
          this.UserSelectedNote = [...data.data];
          if (this.componentType == "NoteActionNotPerformed")
            this.dataServices.userHasSelectNote("NoteColorActionPerformed", this.UserSelectedNote);
          else if (this.componentType == "ReminderActionNotPerformed")
            this.dataServices.userHasSelectNote("ReminderColorActionPerformed", this.UserSelectedNote);
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

  archiveUnarchiveSelectedNote(flag: boolean) {

    var archiveNote = [];

    for (var selectedNote = 0; selectedNote < this.UserSelectedNote.length; selectedNote++) {
      var archivedNote: Archivenote = {
        NoteId: this.UserSelectedNote[selectedNote].noteId,
        IsArchive: flag
      };

      archiveNote.push(archivedNote);
    }

    var archivesNotes: Listofarchivenote = {
      ArchiveNotes: archiveNote
    };

    this.note.archiveTheNote(archivesNotes).
      subscribe(data => {
        if (data.status) {
          this.UserSelectedNote = [...data.data];
          if (this.componentType == "NoteActionNotPerformed")
            this.dataServices.userHasSelectNote("NoteArchiveActionPerformed", this.UserSelectedNote);
          else if (this.componentType == "ReminderActionNotPerformed")
            this.dataServices.userHasSelectNote("ReminderArchiveActionPerformed", this.UserSelectedNote);
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

  ShowListView(flag: boolean) {
    this.showGridView = flag;
    this.dataServices.UserChangedView(flag)
  }

  sendToTrash() {

    var deleteNote = [];

    for (var note = 0; note < this.UserSelectedNote.length; note++) {
      var deleteNoteById: Deletenote = {
        NoteId: this.UserSelectedNote[note].noteId
      };

      deleteNote.push(deleteNoteById);
    }

    var deleteNotes: Listofdeletenote = {
      DeleteNotes: deleteNote
    };

    this.note.TrashNotes(deleteNotes).
      subscribe(data => {
        if (data.status) {
          if (this.componentType == "NoteActionNotPerformed")
            this.dataServices.userHasSelectNote("NoteDeleteActionPerformed", this.UserSelectedNote);
          else if (this.componentType == "ArchiveActionNotPerformed") {
            this.dataServices.userHasSelectNote("ArchiveDeleteActionPerformed", this.UserSelectedNote);
          }
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

  showSearchField() {
    this.showSearch = true;
  }

  openDialog(): void {
    this.dialog.open(EditlabelComponent, { panelClass: 'editLabelDialogContainer' });
  }

  notesClick() {
    this.showKeepIcon = false;
    this.title = "Fundoo";
    this.UserSelectedNote = [];
    localStorage.setItem("fundooTitle", this.title);
  }

  reminderClick() {
    this.showKeepIcon = true;
    this.title = "Reminder";
    this.UserSelectedNote = [];
    localStorage.setItem("fundooTitle", this.title);
  }

  onLabelClick(labelName: string) {
    this.showKeepIcon = true;
    this.title = labelName;
    this.UserSelectedNote = [];
    localStorage.setItem("fundooTitle", this.title);
  }

  archiveClick() {
    this.showKeepIcon = true;
    this.title = "Archive";
    this.UserSelectedNote = [];
    localStorage.setItem("fundooTitle", this.title);
  }

  deleteClick() {
    this.showKeepIcon = true;
    this.title = "Trash";
    this.UserSelectedNote = [];
    localStorage.setItem("fundooTitle", this.title);
  }

  GetAllLabels(): any {
    this.label.GetAllLabels().
      subscribe(data => {
        this.labels = data.data;
        this.dataServices.labelReceive(this.labels);
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

  onFileInput(imageFiles: File): void {

    let file: File = <File>imageFiles[0];

    let filed = new FormData();
    filed.append("", file);

    this.user.AddProfilePic(filed).
      subscribe(data => {
        if (data.status) {
          this.profileImage = data.data.profilePic;
          localStorage.setItem("fundooUserProfilePic", this.profileImage);
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

  doLogout(): void {
    localStorage.removeItem("fundooToken");
    localStorage.removeItem("fundooTitle");
    localStorage.removeItem("fundooUserEmail");
    localStorage.removeItem("fundooUserName");
    localStorage.removeItem("fundooUserProfilePic");
    localStorage.removeItem("fundooNotification");
    this._router.navigate(['login']);
  }

}
