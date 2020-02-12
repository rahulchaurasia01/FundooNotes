import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { ForgetpasswordComponent } from '../components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from '../components/resetpassword/resetpassword.component';

const routes: Routes = [

  { path: '',  component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', redirectTo: "" },
  { path: 'resetpassword/:token', component: ResetpasswordComponent }

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