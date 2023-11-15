import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule,ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful login', () => {
    const mockResponse = 
      { email: 'test@example.com', password: 'password1' }
      // { email: 'another@test.com', password: 'pass123' },
      // Add more test data as needed
    ;
  
    const loginForm = {
      value: {
        email: 'test@example.com',
        password: 'password1',
      },
      reset: jasmine.createSpy('reset'), // Mocking reset function
    };
    
    //spyOn(window, 'alert');
    
    // Partially mock the component to access the private http property
    // const partialMockComponent = jasmine.createSpyObj('LoginComponent', ['login']);
    // (partialMockComponent as any).http = {
    //   get: jasmine.createSpy('get').and.returnValue(of(mockResponse)),
    // };
    spyOn(component['http'], 'get').and.returnValue(of(mockResponse))
    component.login();
  
    expect(component['http'].get).toHaveBeenCalledWith('http://localhost:3000/logindetails');
    //expect(window.alert).toHaveBeenCalledWith('Login Success');
    //expect(loginForm.reset).toHaveBeenCalled();
    //expect(router.navigate).toHaveBeenCalledWith(['employee-dashboard']);
  });
  


  // it('should navigate to employee-dashboard on successful login', () => {
  //   const loginData = [
  //     { email: 'test@example.com', password: 'password1' },
  //     { email: 'another@test.com', password: 'pass123' },
  //     // Add more test data as needed
  //   ];

  //   const loginForm = {
  //     value: {
  //       email: 'test@example.com',
  //       password: 'password1',
  //     },
  //     reset: () => {}, // Mocking reset function
  //   };

  //   spyOn(window, 'alert');

  //   component.loginForm = loginForm as any;
  //   component.login();

  //   const req = httpMock.expectOne('http://localhost:3000/logindetails');
  //   expect(req.request.method).toBe('GET');

  //   req.flush(loginData);

  //   expect(window.alert).toHaveBeenCalledWith('Login Success');
  //   expect(component.loginForm.reset).toHaveBeenCalled();
  //   expect(router.navigate).toHaveBeenCalledWith(['employee-dashboard']);
  // });

  // it('should display user not found alert if login fails', () => {
  //   const loginForm = {
  //     value: {
  //       email: 'nonexistent@example.com',
  //       password: 'invalidpassword',
  //     },
  //     reset: () => {}, // Mocking reset function
  //   };

  //   spyOn(window, 'alert');

  //   component.loginForm = loginForm as any;
  //   component.login();

  //   const req = httpMock.expectOne('http://localhost:3000/logindetails');
  //   expect(req.request.method).toBe('GET');

  //   req.flush([]);

  //   expect(window.alert).toHaveBeenCalledWith('user not found');
  //   expect(component.loginForm.reset).not.toHaveBeenCalled();
  //   expect(router.navigate).not.toHaveBeenCalled();
  // });

  // it('should display error alert if HTTP request fails', () => {
  //   const loginForm = {
  //     value: {
  //       email: 'test@example.com',
  //       password: 'password1',
  //     },
  //     reset: () => {}, // Mocking reset function
  //   };

  //   spyOn(window, 'alert');

  //   component.loginForm = loginForm as any;
  //   component.login();

  //   const req = httpMock.expectOne('http://localhost:3000/logindetails');
  //   expect(req.request.method).toBe('GET');

  //   req.error(new ErrorEvent('Network error'));

  //   expect(window.alert).toHaveBeenCalledWith('Something Went Wrong');
  //   expect(component.loginForm.reset).not.toHaveBeenCalled();
  //   expect(router.navigate).not.toHaveBeenCalled();
  // });


});
