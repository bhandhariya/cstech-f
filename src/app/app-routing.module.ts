import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DesignationComponent } from './components/designation/designation.component';
import { GraphComponent } from './components/graph/graph.component';
import { HomeComponent } from './components/home/home.component';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';



import { 
  AuthGuardService as AuthGuard, LoginGuard 
} from './auth-guard.service';
import { LoginComponent } from './login/login.component';




const routes: Routes = [
  {path:"dashboard",loadChildren:()=>import('./components/dashboard/dashboard.module').then(m=>m.DashboardModule),canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent,canActivate:[LoginGuard]},
  {path:"",redirectTo:"login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
