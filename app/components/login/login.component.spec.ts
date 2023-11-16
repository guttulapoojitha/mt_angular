import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let httpTestingController: HttpTestingController;


  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      // httpTestingController = TestBed.inject(HttpTestingController),
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no outstanding HTTP requests are pending
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send login details to the server', () => {
    const mockLoginForm = {
      // Define a mock login form object
      username: 'testuser',
      password: 'testpassword',
    };

    component.loginForm.setValue(mockLoginForm); // Set the component's loginForm value

    component.logindetails(); // Call the method that sends the login details

    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST'); // Check that a POST request was made
    expect(req.request.body).toEqual(mockLoginForm); // Check that the request body matches the login form

    const mockResponse = { success: true }; // Define a mock response from the server
    req.flush(mockResponse); // Simulate a successful server response

    fixture.detectChanges(); // Update the component after the HTTP request completes

    // Add your assertions here, for example:
    expect(component.loginForm.value).toEqual({ username: '', password: '' }); // Check that the form was reset
    // You can add more expectations based on your component's behavior after a successful login
  });

  it('should handle invalid form submission', () => {
    spyOn(window, 'alert');
    component.loginForm.setValue({ email: '', password: '' });
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields.');
  });

  it('should handle user login success', () => {
    spyOn(window, 'alert');
    // spyOn(component.router, 'navigate'); // Mocking the router navigate method
    const mockResponse = [
      { email: 'test@example.com', password: 'password123' }
    ];
    // spyOn(component.http, 'get').and.returnValue({ subscribe: (successCallback: any) => successCallback(mockResponse) });
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Login Success');
    // expect(component.router.navigate).toHaveBeenCalledWith(['employee-dashboard']);
  });

  it('should handle user login failure', () => {
    spyOn(window, 'alert');
    const mockResponse = [];
    // spyOn(component.http, 'get').and.returnValue({ subscribe: (successCallback: any) => successCallback(mockResponse) });
    component.loginForm.setValue({ email: 'nonexistent@example.com', password: 'wrongpassword' });
    component.login();
    expect(window.alert).toHaveBeenCalledWith('User not found');
  });

  it('should handle HTTP error', () => {
    spyOn(window, 'alert');
    // spyOn(component.http, 'get').and.returnValue({ subscribe: (successCallback: any, errorCallback: any) => errorCallback('Error') });
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Failed to fetch data. Please try again later.');
  });

  it('should make a POST request with loginForm data', () => {
    const mockLoginForm = { username: 'testUser', password: 'testPassword' }; // Mock login form data

    component.loginForm.setValue(mockLoginForm); // Set the form value in the component

    component.logindetails(); // Call the method

    const req = httpTestingController.expectOne('http://localhost:3000/users'); // Check if the POST request was made to the specified URL
    expect(req.request.method).toBe('POST'); // Check if the request method is POST
    expect(req.request.body).toEqual(mockLoginForm); // Check if the request body matches the login form data

    req.flush({ /* Mock response data */ }); // Simulate a response
  });

  it('should reset the login form after successful login', () => {
    spyOn(component.loginForm, 'reset'); // Spy on the reset method of the form

    component.logindetails(); // Call the method

    const req = httpTestingController.expectOne('http://localhost:3000/users');
    req.flush({ /* Mock response data */ }); // Simulate a successful response

    expect(component.loginForm.reset).toHaveBeenCalled(); // Check if the reset method was called
  });

  it('should navigate to signup route', () => {
    spyOn(router, 'navigate'); // Spy on the router's navigate method

    // Call the register method
    component.register();

    // Check if the navigate method was called with the expected route
    expect(router.navigate).toHaveBeenCalledWith(['signup']);
  });

  

});
