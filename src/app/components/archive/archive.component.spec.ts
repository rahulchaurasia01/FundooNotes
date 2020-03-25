import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaynoteComponent } from '../displaynote/displaynote.component';
import { ReminderPipe } from '../../pipe/reminder.datepipe';
import { NoteiconComponent } from '../noteicon/noteicon.component';
import { AppMaterialModule } from '../../module/material/app.material.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { ArchiveComponent } from './archive.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { AppRoutingModule } from '../../routing/app.routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotesComponent } from '../notes/notes.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { LabelComponent } from '../label/label.component';
import { TrashComponent } from '../trash/trash.component';
import { CreatenoteComponent } from '../createnote/createnote.component';
import { CollaboratordialogComponent } from '../collaboratordialog/collaboratordialog.component';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { NotedialogComponent } from '../notedialog/notedialog.component';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { APP_BASE_HREF } from '@angular/common';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ArchiveComponent,
        DisplaynoteComponent,
        ReminderPipe,
        NoteiconComponent,
        LoginComponent,
        SignupComponent,
        ForgetpasswordComponent,
        ResetpasswordComponent,
        DashboardComponent,
        NotesComponent,
        ReminderComponent,
        LabelComponent,
        TrashComponent,
        CreatenoteComponent,
        CollaboratordialogComponent,
        EditlabelComponent,
        NotedialogComponent,
        DeletedialogComponent
      ],
      imports: [
        AppMaterialModule,
        NgxMasonryModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FlexLayoutModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : "my/App" }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
