import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HomeComponent } from '../../components/home/home.component';
import { AddEmployeeComponent } from '../../components/add-employee/add-employee.component';
import { SearchEmployeeComponent } from '../../components/search-employee/search-employee.component';
import { GraphComponent } from '../../components/graph/graph.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { DesignationComponent } from '../../components/designation/designation.component';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashbaord.routing';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidePanelComponent } from '../shared/side-panel/side-panel.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
@NgModule({
  declarations: [
    HomeComponent,
    AddEmployeeComponent,
    SearchEmployeeComponent,
    GraphComponent,
    DesignationComponent,
    DashboardComponent,
    NavbarComponent,SidePanelComponent,FooterComponent,EmployeeListComponent
  ],
  imports: [
      CommonModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,ChartsModule,DashboardRoutingModule
  ],
  providers: []
})
export class DashboardModule { }
