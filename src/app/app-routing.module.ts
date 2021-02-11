import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DesignationComponent } from './components/designation/designation.component';
import { GraphComponent } from './components/graph/graph.component';
import { HomeComponent } from './components/home/home.component';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"add",component:AddEmployeeComponent},
  {path:"search",component:SearchEmployeeComponent},
  {path:"graph",component:GraphComponent},
  {path:"designation",component:DesignationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
