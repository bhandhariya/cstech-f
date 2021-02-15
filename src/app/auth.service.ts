import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public setUserInfo(user:any){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }
// url:any="http://localhost:3000";
url:any="https://cstech-b.herokuapp.com";
  public validate(email:any, password:any) {
    return this.http.post(this.url+'/authenticate', {'username' : email, 'password' : password}).toPromise()
  }
}