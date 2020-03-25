import { TestBed, inject } from '@angular/core/testing';

import { HttpServiceService } from './http-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/routing/app.routing.module';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { ForgetpasswordComponent } from 'src/app/components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from 'src/app/components/resetpassword/resetpassword.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { NotesComponent } from 'src/app/components/notes/notes.component';
import { ReminderComponent } from 'src/app/components/reminder/reminder.component';
import { LabelComponent } from 'src/app/components/label/label.component';
import { ArchiveComponent } from 'src/app/components/archive/archive.component';
import { TrashComponent } from 'src/app/components/trash/trash.component';
import { CreatenoteComponent } from 'src/app/components/createnote/createnote.component';
import { DisplaynoteComponent } from 'src/app/components/displaynote/displaynote.component';
import { NoteiconComponent } from 'src/app/components/noteicon/noteicon.component';
import { CollaboratordialogComponent } from 'src/app/components/collaboratordialog/collaboratordialog.component';
import { EditlabelComponent } from 'src/app/components/editlabel/editlabel.component';
import { NotedialogComponent } from 'src/app/components/notedialog/notedialog.component';
import { DeletedialogComponent } from 'src/app/components/deletedialog/deletedialog.component';
import { ReminderPipe } from 'src/app/pipe/reminder.datepipe';
import { AppMaterialModule } from 'src/app/module/material/app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMasonryModule } from 'ngx-masonry';
import { APP_BASE_HREF } from '@angular/common';

describe('HttpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
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
        NotedialogComponent,
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
        { provide: APP_BASE_HREF, useValue: "my/App" },
        HttpServiceService
      ]
    });
  });

  it('should be created', inject([HttpServiceService], (service: HttpServiceService) => {
    expect(service).toBeTruthy();
  }));
});
