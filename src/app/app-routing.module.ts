import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DesignationComponent } from './components/designation/designation.component';
import { GraphComponent } from './components/graph/graph.component';
import { HomeComponent } from './components/home/home.component';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"add",component:AddEmployeeComponent,canActivate:[AuthGuard]},
  {path:"search",component:SearchEmployeeComponent,canActivate:[AuthGuard]},
  {path:"graph",component:GraphComponent,canActivate:[AuthGuard]},
  {path:"designation",component:DesignationComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
