import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { LoginComponent } from '../login/login.component';
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
import { NotedialogComponent } from '../notedialog/notedialog.component';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { ReminderPipe } from 'src/app/pipe/reminder.datepipe';
import { APP_BASE_HREF } from '@angular/common';
import { AppMaterialModule } from 'src/app/module/material/app.material.module';
import { AppRoutingModule } from 'src/app/routing/app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMasonryModule } from 'ngx-masonry';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SignupComponent,
        LoginComponent,
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
        NotedialogComponent,
        DeletedialogComponent,
        ReminderPipe
      ],
      imports: [
        BrowserAnimationsModule,
        AppMaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxMasonryModule,
        HttpClientModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : "my/App" }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
