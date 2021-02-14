import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email =new  FormControl;
  password =new FormControl;
  constructor(private authService : AuthService, private router : Router) { }

  loginFrom= new FormGroup({
    username:new FormControl(''),
    password:new FormControl('')
  })
  ngOnInit(): void {
  }

  login(){
    var obj={
      username:"admin",
      password:"admin"
    }
    this.authService.validate(obj.username,obj.password).then((response:any)=>{
      this.authService.setUserInfo({"USER":response['user']});
      this.router.navigate(['/dashboard/home']);
    })
  }
  onSubmit(r:any){
   console.log(this.loginFrom.value);
   this.authService.validate(r.username,r.password).then((response:any)=>{
    this.authService.setUserInfo({"USER":response['user']});
    this.router.navigate(['/dashboard/home']);
  })
  }
}