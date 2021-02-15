import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  person = { firstName: "Jessy", props: ['a','c']}
  dynamicData = [
    { value: 'a',name:'name1' },
    { value: 'b',name:'name2' },
    { value: 'c',name:'name3' },
    { value: 'd',name:'name4' }
  ];
  myForm=new FormGroup({
    person:new FormControl('Jessy'),
    props:new FormControl(['a','b'])
  })

  sendData(person:any) {
    console.log(person)
  }


}
