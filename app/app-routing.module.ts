import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'view/:id', component: ViewComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
