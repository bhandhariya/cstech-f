import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private authService : AuthService, private router : Router,private fb:FormBuilder) { }

  loginFrom:any;

  ngOnInit(): void {
    this.loginFrom=this.fb.group({
      username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    })
  }
  validationMessages : any  = {
    'username' : {
                    'required': 'Username is Required',
                  },
    'password' : {
                    'required': 'Password is Required',
                  }
    }

formErrors : any= {
  'username' : '',
  'password' : ''
}
submmited: boolean = false;
logValidationMessages(group: FormGroup = this.loginFrom): void {
  Object.keys(group.controls).forEach((key: string) => {
    const abstractControl = group.get(key);
      this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || this.submmited)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
        if (abstractControl instanceof FormGroup) {
          this.logValidationMessages(abstractControl);
        } 
    });
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
    this.submmited=true;
    this.logValidationMessages();
   console.log(this.loginFrom.value);
  if(this.loginFrom.valid){
    this.authService.validate(r.username,r.password).then((response:any)=>{
      sessionStorage.setItem('name',response.data.name)
      this.authService.setUserInfo({"USER":response['user']});
      this.router.navigate(['/dashboard/home']);
    }).catch((err:any)=>{
      console.log(err)
    })
  }
  }
}
