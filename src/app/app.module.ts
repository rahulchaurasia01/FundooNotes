import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesComponent } from './components/notes/notes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { CreatenoteComponent } from './components/createnote/createnote.component';
import { DisplaynoteComponent } from './components/displaynote/displaynote.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { LabelComponent } from './components/label/label.component';
import { EditlabelComponent } from './components/editlabel/editlabel.component';
import { DeletedialogComponent } from './components/deletedialog/deletedialog.component';
import { NoteiconComponent } from './components/noteicon/noteicon.component';
import { NotedialogComponent } from './components/notedialog/notedialog.component';
import { CollaboratordialogComponent } from './components/collaboratordialog/collaboratordialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppMaterialModule } from './module/material/app.material.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { AuthGuard } from './services/authguard/auth.guard';
import { NgxMasonryModule } from 'ngx-masonry';

import { HttpClientModule } from '@angular/common/http';
import { ReminderPipe } from './pipe/reminder.datepipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    DashboardComponent,
    NotesComponent,
    CreatenoteComponent,
    DisplaynoteComponent,
    ReminderComponent,
    ArchiveComponent,
    TrashComponent,
    LabelComponent,
    EditlabelComponent,
    DeletedialogComponent,
    NoteiconComponent,
    NotedialogComponent,
    CollaboratordialogComponent,
    ReminderPipe
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    NgxMasonryModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [EditlabelComponent, DeletedialogComponent, NotedialogComponent, CollaboratordialogComponent]
})
export class AppModule { }
