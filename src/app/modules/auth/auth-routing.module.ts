import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Frello Login'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Frello Forgot Password'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Frello Register'
  },
  {
    path: 'recovery',
    component: RecoveryComponent,
    title: 'Frello Recovery'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
