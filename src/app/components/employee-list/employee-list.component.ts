import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MainService } from 'src/app/main.service';
import Swal from 'sweetalert2'
declare var jQuery: any;

export interface myData {
  _id:string,
  image:string,
  name: string;
  email:string,
  salary:number,
  createdAt:string,
  active:boolean,
  course:any,
  gender:string,
  phone:number,
  designation:{
    title:string,
    _id:string
  }

}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit,AfterViewInit  {
  displayedColumnss: string[] = ['_id','image','name',"salary" , 'designation','email','createdAt','active','course','gender','phone','actions'];
  dataSource!: MatTableDataSource<myData>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private main:MainService,private fb:FormBuilder,
    private storage:AngularFireStorage) {

    this.main.getAllEmployee().subscribe((res:any)=>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

   }
   EmployeeEditForm:any;
  ngOnInit(): void {
    this.main.getAllDesignation().subscribe(r=>{
      this.AllDesignation=r;
    })
    this.EmployeeEditForm=this.fb.group({
      name:new FormControl(''),
      email:new FormControl(''),
      salary:new FormControl(''),
      designation:new FormControl(''),
      mobile:new FormControl(''),
      gender:new FormControl(''),
      course:new FormControl(''),
      image:new FormControl(''),
      id:new FormControl('')
    });
  }
  
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  getAllEmployee(){
    this.main.getAllEmployee().subscribe((res:any)=>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteraja(row:any){
    console.log(row)
  }  
  AllDesignation:any;
  EmployeeForm:any;
 
  CourseData: Array<any> = [
    { name: 'BCA', value: 'BCA' },
    { name: 'MCA', value: 'MCA' },
    { name: 'BSC', value: 'BSC' }
  ];
  photo:any;
  editEmployee(employee:any){
    console.log(employee);
    this.photo=employee.imageURL;
    this.EmployeeEditForm.get('name')?.setValue(employee.name);
    this.EmployeeEditForm.get('email')?.setValue(employee.emails);
    this.EmployeeEditForm.get('salary')?.setValue(employee.salary);
    this.EmployeeEditForm.get('designation')?.setValue(employee.designation._id);
    this.EmployeeEditForm.get('id')?.setValue(employee._id);
    this.EmployeeEditForm.get('mobile')?.setValue(employee.phone);
    this.EmployeeEditForm.get('gender')?.setValue(employee.gender);
    this.EmployeeEditForm.get('image')?.setValue(employee.imageURL);
    this.EmployeeEditForm.get('course')?.setValue(employee.course);
    jQuery('#edit').modal('show');

  }
  saveEditEmployee(){
    console.log(this.EmployeeEditForm.value);
    if(this.EmployeeEditForm.valid){
      this.main.editEmployee(this.EmployeeEditForm.value).subscribe((result:any)=>{
        console.log(result);
        
        if(result){
          jQuery('#edit').modal('hide');
          Swal.fire(
            'Edited!',
            'You Have Edited this Employee!',
            'success'
          )
          this.getAllEmployee();
        }
        if(result==null){
          Swal.fire(
            'fill other email!',
            'this email is already exists!',
            'warning'
          ) 
        }
      },err=>{
        this.main.handleError(err)
      })
    }
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

  // uploadImage(event:any){
  //   alert('goint to chage')
  // }
  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.EmployeeEditForm.get('course') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  downloadURL: Observable<string> | undefined;
uploadImage(event:any) {
  console.log(event)
  const file = event.target.files[0];
  var randomString=Math.floor(Date.now() / 1000);
  //   var picName=randomString;
  const filePath = 'employee'+randomString;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);

  // observe percentage changes
  // this.uploadPercent = task.percentageChanges();
  // get notified when the download URL is available
  task.snapshotChanges().pipe(
      finalize(() =>{ this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.subscribe(e=>{
          console.log(e)
         if(e){
          this.EmployeeEditForm.get('image').setValue(e)

         }
        })
      } )
   )
  .subscribe(e=>{
    
  })
  
}
showPhoto:boolean=false;
chnagePhoto(){
this.showPhoto=true;
}
deactivate(row:any){
var obj={
  id:row._id
}

this.main.deActivate(obj).subscribe((result:any)=>{
  console.log(result);
  if(result){
    this.getAllEmployee()
    Swal.fire(
      'Deactivated!',
      'You Have De-activated this Employee!',
      'success'
    )
    this.getAllEmployee()
  }
},err=>{})

}
activate(row:any){
  var obj={
    id:row._id
  }
  
  this.main.activate(obj).subscribe((result:any)=>{
    console.log(result);
    if(result){
      this.getAllEmployee()
      Swal.fire(
        'Activated!',
        'You Have Activated this Employee!',
        'success'
      )
    }
  },err=>{})
  
}
}

