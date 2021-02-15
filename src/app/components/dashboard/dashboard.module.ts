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
import { MatPaginatorModule } from "@angular/material/paginator";

import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckboxComponent } from '../shared/checkbox/checkbox.component';
@NgModule({
  declarations: [
    HomeComponent,
    AddEmployeeComponent,
    SearchEmployeeComponent,
    GraphComponent,
    DesignationComponent,
    DashboardComponent,
    NavbarComponent,SidePanelComponent,FooterComponent,EmployeeListComponent,CheckboxComponent
  ],
  imports: [
      CommonModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,ChartsModule,DashboardRoutingModule,MatTableModule,MatPaginatorModule,MatFormFieldModule,MatInputModule
  ],
  providers: []
})
export class DashboardModule { }
