import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
var firebaseConfig = {
  apiKey: "AIzaSyADX5A2GvqnF6u4ye4RhDVGZ4v0nRfRWK0",
  authDomain: "backendapi-7cf54.firebaseapp.com",
  databaseURL: "https://backendapi-7cf54.firebaseio.com",
  projectId: "backendapi-7cf54",
  storageBucket: "backendapi-7cf54.appspot.com",
  messagingSenderId: "367214165691",
  appId: "1:367214165691:web:78fe80a0f9c8ddd019b39e",
  measurementId: "G-JEY1036J33"
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,ChartsModule,AngularFireModule.initializeApp(firebaseConfig),AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
