import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('name'));
    this.UserName=sessionStorage.getItem('name');
  }
  logout(){
    localStorage.removeItem('userInfo');
    localStorage.removeItem('name');
    this.router.navigate(['/login'])
  }
  UserName:any;

}
