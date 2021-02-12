import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  
  constructor(private http:HttpClient) { }


  handleError(){

  }
  getAllDesignation(){
    return this.http.get('https://cstech-b.herokuapp.com');
  }
  getAllEmployee(){
    return this.http.get('https://cstech-b.herokuapp.com/users');
  }
  addEmployee(emp:any){
    return this.http.post('https://cstech-b.herokuapp.com/users/addEmp',emp);
  }
  editEmployee(emp:any){
    return this.http.post('https://cstech-b.herokuapp.com/users/saveEditEmp',emp);
  }
  deleteEmployee(emp:any){
    return this.http.post('https://cstech-b.herokuapp.com/users/deleteEmpbyId',emp);
  }
  search(emp:any){
    return this.http.post('https://cstech-b.herokuapp.com/users/search',emp);
  }
  addDesignation(emp:any){
    return this.http.post('https://cstech-b.herokuapp.com/add-designation',emp);
  }
  getGraphData(){
    return this.http.get('https://cstech-b.herokuapp.com/users/time');
  }
}
