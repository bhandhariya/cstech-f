import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  login(){
    var obj={
      username:"admin",
      password:"admin"
    }
    this.authService.validate(obj.username,obj.password).then((response:any)=>{
      this.authService.setUserInfo({"USER":response['user']});
      this.router.navigate(['home']);
    })
  }

}
