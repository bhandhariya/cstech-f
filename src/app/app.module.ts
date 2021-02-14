import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';
import { GraphComponent } from './components/graph/graph.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { DesignationComponent } from './components/designation/designation.component';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEmployeeComponent,
    SearchEmployeeComponent,
    GraphComponent,
    DesignationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
