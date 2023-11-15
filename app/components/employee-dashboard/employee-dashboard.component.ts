import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ApiService } from '../../service/api.service';
import { EmployeeModel } from './employee-dashboard.model';
import swl from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-dashboard',

  providers: [ApiService],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  employeeModelObj: EmployeeModel = new EmployeeModel();

  p: number = 1;
  formValue !: FormGroup;
  employeeData: any = [];
  showAdd !: boolean;
  showUpdate!: boolean;


  showUpdateTitle!: boolean;
  showAddTitle!: boolean;
  validatefirstName: any;






  constructor(private formBuilder: FormBuilder, private api: ApiService, private http: HttpClient, private router: Router) {

  }

  addButtonClickFunction() {
    this.formValue.reset();
    this.showUpdate = false;
    this.showAdd = true;

    this.showUpdateTitle = false;
  }

  ngOnInit(): void {


    this.formValue = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$')
        ]
      ],
      lastName: ['null'],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Mobile: ["", [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    })





    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.employeeModelObj.id = this.formValue.value.id;

    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.Email = this.formValue.value.Email;
    this.employeeModelObj.Mobile = this.formValue.value.Mobile;
    console.log(this.formValue.value.Photo)


    let cancel = document.getElementById("cancel");
    this.http.get<any>("http://localhost:3000/posts",)
      .subscribe(res => {
        const user = res.find((tera: any) => {

          return ((tera.email === this.formValue.value.email) && (tera.Mobile === this.formValue.value.Mobile))
        });
        if (user) {
          alert("Email or Mobile Number is Already exist");
        } else {
          this.api.postData(this.employeeModelObj).subscribe(a => {
            console.log(a);
            alert("Record inserted successfully");
            cancel?.click(); this.formValue.reset();
            this.getAllEmployee();
          })


        }
      }) 


  }


  getAllEmployee() {
    this.api.getData().subscribe(anil => {
      this.employeeData = anil;
    })

  }

  updateEmployee(row: any) {
    this.showUpdate = true;
    this.showAdd = false;

    this.showUpdateTitle = true;
    this.showAddTitle = false;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['Email'].setValue(row.Email);
    this.formValue.controls['Mobile'].setValue(row.Mobile);
    this.router.navigate(['/view/' + row.id]);
  }

  updateEmployeeDetails() {

    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.Email = this.formValue.value.Email;
    this.employeeModelObj.Mobile = this.formValue.value.Mobile;
    this.api.updateData(this.employeeModelObj, this.employeeModelObj.id).subscribe(a => {
      alert("Record updated Succesfully");

      let cancel = document.getElementById("cancel");

      cancel?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }



  deleteEmployee(id: any) {
    swl.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DeleteData(id);
      }
    })
  }
  DeleteData(id: any): void {
    this.api.deleteData(id).subscribe((res) => {
      this.getAllEmployee()
      swl.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    },
      err => {
        alert('some thing went wrong');
      }
    )
  }

  logout() {
    this.router.navigate(['login'])

  }
  job() {
    this.router.navigate(['job'])

  }


}
