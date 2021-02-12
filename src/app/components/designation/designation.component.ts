import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  DesignationForm=new FormGroup({
    title:new FormControl('')
  });
  DesignationFormSubmit(data:any){
    console.log(data);
    this.http.post('https://cstech-b.herokuapp.com/add-designation',data).subscribe(r=>{
    console.log(r)
    })
  }
}
