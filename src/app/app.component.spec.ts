import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/authguard/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './module/material/app.material.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesComponent } from './components/notes/notes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { LabelComponent } from './components/label/label.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { CreatenoteComponent } from './components/createnote/createnote.component';
import { DisplaynoteComponent } from './components/displaynote/displaynote.component';
import { NoteiconComponent } from './components/noteicon/noteicon.component';
import { CollaboratordialogComponent } from './components/collaboratordialog/collaboratordialog.component';
import { EditlabelComponent } from './components/editlabel/editlabel.component';
import { NotedialogComponent } from './components/notedialog/notedialog.component';
import { DeletedialogComponent } from './components/deletedialog/deletedialog.component';
import { APP_BASE_HREF } from '@angular/common';
import { NgxMasonryModule } from 'ngx-masonry';
import { ReminderPipe } from './pipe/reminder.datepipe';
describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
        { provide: APP_BASE_HREF },
        AuthGuard
      ]
    }).compileComponents();
  }));
  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
  // it(`should have as title 'FundooNotes'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('FundooNotes');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
