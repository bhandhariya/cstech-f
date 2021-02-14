import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { DesignationComponent } from '../designation/designation.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { GraphComponent } from '../graph/graph.component';
import { HomeComponent } from '../home/home.component';
import { SearchEmployeeComponent } from '../search-employee/search-employee.component';
import { DashboardComponent } from './dashboard.component';



// import { 
//   AuthGuardService as AuthGuard 
// } from './auth-guard.service';


const routes: Routes = [
  {path:"",component:DashboardComponent,children:[
    {path:"home",component:HomeComponent,},
    {path:"add",component:AddEmployeeComponent,},
    {path:"search",component:SearchEmployeeComponent,},
    {path:"graph",component:GraphComponent,},
    {path:"designation",component:DesignationComponent,},
    {path:"list",component:EmployeeListComponent,},
    {path:"",redirectTo:"home",pathMatch:"full"},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
