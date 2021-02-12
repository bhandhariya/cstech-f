import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  constructor(private http:HttpClient,private main:MainService) { }

  ngOnInit(): void {
  }
  DesignationForm=new FormGroup({
    title:new FormControl('')
  });
  DesignationFormSubmit(data:any){
    console.log(data);
    this.main.addDesignation(data).subscribe(r=>{
    console.log(r);
    if(r){
      alert('Designation added');
      this.DesignationForm.reset();
    }
    })
  }
}
