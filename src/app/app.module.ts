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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppMaterialModule } from './app.material.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { AuthGuard } from './services/auth.guard';

import { HttpClientModule } from '@angular/common/http';

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
    EditlabelComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [EditlabelComponent]
})
export class AppModule { }
