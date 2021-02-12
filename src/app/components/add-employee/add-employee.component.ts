import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/main.service';
import Swal from 'sweetalert2'

declare var jQuery: any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  EmployeeForm:any;
  constructor(private fb:FormBuilder,private http:HttpClient,private main:MainService) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllDesignation()
  this.EmployeeForm=this.fb.group({
    name : ['',[Validators.required]],
    email : ['',[Validators.required,Validators.email]],
    salary : ['',[Validators.required]],
    designation : ['',[Validators.required]]
  })
  this.EmployeeForm.valueChanges.subscribe((value:any)=>{
    this.logValidationMessages();
  })
  }
  
  validationMessages : any  = {
    'name' : {
                    'required': 'Name Name is Required',
                  },
    'email' : {
                    'required': 'Email is Required',
                    'email': 'Invalid Email'
                  },
    'salary' : {
                      'required': 'Salary is reuired',

                    },
    'designation' : {
                      'required': 'Designation is required'
                    }
};
formErrors :any= {
  'name' : '',
  'email' : '',
  'salary' : '',
  'designation' : ''
};
submmited: boolean = false;
logValidationMessages(group: FormGroup = this.EmployeeForm): void {
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
onSubmit(formData:any){

  this.submmited = true;
    this.logValidationMessages();
    if(this.EmployeeForm.valid){
     console.log(formData)
      this.main.addEmployee(formData).subscribe((r:any)=>{
        console.log(r);
       if(r._id){
        Swal.fire(
          'Added!',
          'You have added a new Employee!',
          'success'
        )
        this.EmployeeForm.reset();
        this.getAllEmployee();
       }else{
         if(r.code==11000 && r.keyPattern.email==1){
          Swal.fire(
            'fill other email!',
            'this email is already exists!',
            'warning'
          ) 
         }
       }
      },err=>{
        this.main.handleError(err)
      })
    }
}
AllDesignation:any;
getAllDesignation(){
  this.main.getAllDesignation().subscribe(r=>{
    this.AllDesignation=r;
    console.log(this.AllDesignation)
    },err=>{
      this.main.handleError(err)
    })
}
AllEmployewe:any;
getAllEmployee(){
  this.main.getAllEmployee().subscribe(r=>{
  this.AllEmployewe=r;
  console.log(this.AllEmployewe)
  },err=>{
    this.main.handleError(err)
  })
}
numberOnly(event:any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

EmployeeEditForm=new FormGroup({
  name:new FormControl(''),
  email:new FormControl(''),
  salary:new FormControl(''),
  designation:new FormControl(''),
  id:new FormControl('')
});
name:any;
email:any;
salary:any;
designation:any;
designationid:any;
editEmployee(employee:any){
  console.log(employee);
  this.EmployeeEditForm.get('name')?.setValue(employee.name);
  this.EmployeeEditForm.get('email')?.setValue(employee.email);
  this.EmployeeEditForm.get('salary')?.setValue(employee.salary);
  this.EmployeeEditForm.get('designation')?.setValue(employee.designation._id);
  this.EmployeeEditForm.get('id')?.setValue(employee._id);
  console.log(this.EmployeeEditForm.value)
}
saveEditEmp(){
  console.log(this.EmployeeEditForm.value)
  this.main.editEmployee(this.EmployeeEditForm.value).subscribe((result:any)=>{
    console.log(result);
    
    if(result._id){
      jQuery('#edit').modal('hide');
      Swal.fire(
        'Edited!',
        'You Have Edited this Employee!',
        'success'
      )
      this.getAllEmployee();
    }
  },err=>{
    this.main.handleError(err)
  })
}
deleteEmp(employee:any){

  Swal.fire({
    title: 'Do you want to Delete this Employee?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Delete`,
    denyButtonText: `Don't Delete`,
  }).then((result) => {
    if (result.isConfirmed) {
      this.main.deleteEmployee({id:employee._id}).subscribe(result=>{
        console.log(result);
        if(result){
          Swal.fire(
            'Deleted!',
            'You Have Deleted this Employee!',
            'success'
          )
          this.getAllEmployee();
        }
      },err=>{
        this.main.handleError(err)
      })    
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })


  
}
searchVar:any;
searchItem:any;
search(){
  console.log(this.searchVar)
}
digsearch(){
  let obj={

  }
  if(this.searchVar==1){
    obj={
      type:"name",
      value:this.searchItem
    }
  }
  else if(this.searchVar==2){
    obj={
      type:"email",
      value:this.searchItem
    }
  }else if(this.searchVar==3){
    obj={
      type:"salary",
      gt:this.gt,
      lt:this.lt,
      value:this.searchItem
    }
  }else if(this.searchVar==4){
    obj={
      type:"designation",
      value:this.searchItem
    }
  }
  console.log(obj);
  this.main.search(obj).subscribe(result=>{
    console.log(result)
    this.AllEmployewe=result;
  },err=>{
    this.main.handleError(err)
  })
}
test(){
  this.http.get('http://localhost:3000/users/test').subscribe(r=>{
    console.log(r)
  })
}
gt:any;lt:any;
}
