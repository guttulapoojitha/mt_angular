import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm !: FormGroup;
  show: boolean = true;
  // passwords:any;
  password: any;
  shows: boolean = true;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: [null, [Validators.required, Validators.pattern('^[a-z A-a]+$')]],
      lastname: [null, [Validators.required, Validators.pattern('^[a-z A-a]+$')]],
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      cpassword: [null, [Validators.required, Validators.minLength(8)]]
    })
    this.password = 'password';
    this.password = 'passwords';
    
  }
  login() {
    
    this.router.navigate(['login'])
  }
  signUp() {
    const data = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      // token: 'fake-auth-token'
    }
    this.http.get<any>("http://localhost:3000/users",)
      .subscribe(res => {
        const user = res.find((tera: any) => {

          return tera.email === this.signUpForm.value.email
        });
        if (user) {
          alert("Email is Already exist");
        } else {

          this.api.postusers(data).subscribe((res) => {

            console.log(res)
            this.signUpForm.reset();
            alert("Signup is Success");
            this.router.navigate(['login'])
          })
        }
      })
  }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  
}
