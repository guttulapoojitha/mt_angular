import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  httpMock(httpMock: any, arg1: string) {
    throw new Error('Method not implemented.');
  }

  public loginForm!: FormGroup
  constructor(private fromBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.loginForm = this.fromBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(8)]],

    })

  }

  // userName: any;
  // login() {
  //   this.http.get<any>("http://localhost:3000/logindetails",)
  //     .subscribe(res => {
  //       const user = res.find((tera: any) => {

  //         return tera.email === this.loginForm.value.email && tera.password === this.loginForm.value.password
  //       });
  //       if (user) {
  //         alert("Login Success");
  //         console.log(res)
  //         this.loginForm.reset();
  //         this.router.navigate(['employee-dashboard'])
  //       } else {
  //         alert("user not found")

  //       }
  //     }, err => {
  //       alert("Something Went Wrong")
  //     })
  // }

  login() {
    if (this.loginForm.invalid) {
      // Handle form validation errors
      alert('Please fill in all required fields.');
      return;
    }

    this.http.get<any>('http://localhost:3000/logindetails').subscribe(
      (res: any) => {
        const user = res.find((tera: any) => {
          return tera.email === this.loginForm.value.email && tera.password === this.loginForm.value.password;
        });

        if (user) {
          alert('Login Success');
          console.log(res);
          this.loginForm.reset();
          this.router.navigate(['employee-dashboard']);
        } else {
          alert('User not found');
        }
      },
      (err) => {
        // Handle HTTP error
        alert('Failed to fetch data. Please try again later.');
      }
    );
  }

  logindetails() {

    this.http.post<any>("http://localhost:3000/users", this.loginForm.value)
      .subscribe(res => {
        console.log(res)
        this.loginForm.reset();

      })
  }

  register() {
    this.router.navigate(['signup'])
  }
}
