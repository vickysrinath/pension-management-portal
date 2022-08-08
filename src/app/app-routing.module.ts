import { LoginGuard } from './login.guard';
import { AuthGuard } from './auth.guard';
import { ProcessPensionComponent } from './process-pension/process-pension.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path:"",component:LoginComponent,canActivate:[LoginGuard]},
{path:"login",component:LoginComponent,canActivate:[LoginGuard]},
{path:"signup",component: SignupComponent,canActivate:[LoginGuard]},
{path:"home",component: ProcessPensionComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
