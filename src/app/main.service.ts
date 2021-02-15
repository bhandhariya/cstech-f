import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  // url:any="http://localhost:3000";
  url:any="https://cstech-b.herokuapp.com";
  constructor(private http:HttpClient) { }
  

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + "this.storage.token"
  });


  handleError(error:any){
    console.log(error)
  }
  getAllDesignation(){
    console.log(this.headers)
    return this.http.get(this.url,{headers:this.headers});
  }
  getAllEmployee(){
    return this.http.get(this.url+'/users');
  }
  addEmployee(emp:any){
    return this.http.post(this.url+'/users/addEmp',emp);
  }
  editEmployee(emp:any){
    return this.http.post(this.url+'/users/saveEditEmp',emp);
  }
  deleteEmployee(emp:any){
    return this.http.post(this.url+'/users/deleteEmpbyId',emp);
  }
  search(emp:any){
    return this.http.post(this.url+'/users/search',emp);
  }
  addDesignation(emp:any){
    return this.http.post(this.url+'/add-designation',emp);
  }
  getGraphData(){
    return this.http.get(this.url+'/users/time');
  }
  login(data:any){
     return this.http.post(this.url+'/login',data);
  }
  activate(emp:any){
    return this.http.post(this.url+'/users/activate',emp);
  }
  deActivate(emp:any){
    return this.http.post(this.url+'/users/deactivate',emp);
  }
}
