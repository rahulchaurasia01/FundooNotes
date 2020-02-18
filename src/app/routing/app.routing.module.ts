import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { ForgetpasswordComponent } from '../components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from '../components/resetpassword/resetpassword.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthGuard } from '../services/auth.guard';
import { NotesComponent } from '../components/notes/notes.component';
import { ReminderComponent } from '../components/reminder/reminder.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', redirectTo: "" },
  { path: 'resetpassword/:token', component: ResetpasswordComponent },
  { path: '',  component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
      
    children: [
    
      { path: 'notes', component: NotesComponent },
      { path: 'reminder', component: ReminderComponent },
      { path: '', redirectTo:'notes', pathMatch:'full' }
    
    ]

  }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
