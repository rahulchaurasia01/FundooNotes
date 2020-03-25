import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotedialogComponent } from './notedialog.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotesComponent } from '../notes/notes.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { LabelComponent } from '../label/label.component';
import { ArchiveComponent } from '../archive/archive.component';
import { TrashComponent } from '../trash/trash.component';
import { CreatenoteComponent } from '../createnote/createnote.component';
import { DisplaynoteComponent } from '../displaynote/displaynote.component';
import { NoteiconComponent } from '../noteicon/noteicon.component';
import { CollaboratordialogComponent } from '../collaboratordialog/collaboratordialog.component';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { ReminderPipe } from 'src/app/pipe/reminder.datepipe';
import { AppMaterialModule } from 'src/app/module/material/app.material.module';
import { AppRoutingModule } from 'src/app/routing/app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMasonryModule } from 'ngx-masonry';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('NotedialogComponent', () => {
  let component: NotedialogComponent;
  let fixture: ComponentFixture<NotedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NotedialogComponent,
        LoginComponent,
        SignupComponent,
        ForgetpasswordComponent,
        ResetpasswordComponent,
        DashboardComponent,
        NotesComponent,
        ReminderComponent,
        LabelComponent,
        ArchiveComponent,
        TrashComponent,
        CreatenoteComponent,
        DisplaynoteComponent,
        NoteiconComponent,
        CollaboratordialogComponent,
        EditlabelComponent,
        DeletedialogComponent,
        ReminderPipe
      ],
      imports: [
        AppMaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxMasonryModule,
        HttpClientModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : "my/App" },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
