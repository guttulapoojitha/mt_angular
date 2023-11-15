import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpMock: HttpTestingController;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule,ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change password to text and set show to true if password is "password"', () => {
    component.password = 'password';
    component.show = false;

    component.onClick();

    expect(component.password).toEqual('text');
    expect(component.show).toBe(true);
  });

  it('should change password to "password" and set show to false if password is not "password"', () => {
    component.password = 'randomPassword';
    component.show = true;

    component.onClick();

    expect(component.password).toEqual('password');
    expect(component.show).toBe(false);
  });

  // it('should handle successful signup', () => {
  //   const mockUserResponse: never[] = []; // Mock the response for user existence check
  //   const mockPostUserResponse = { success: true }; // Mock the response for posting user

  //   spyOn(component.router, 'navigate').and.stub(); // Stubbing router.navigate

  //   // Mocking GET request to check for user existence
  //   component.signUp();
  //   const userExistRequest = httpMock.expectOne('http://localhost:3000/users');
  //   userExistRequest.flush(mockUserResponse);

  //   // Expect alert for successful signup
  //   spyOn(window, 'alert');
  //   const postUserRequest = httpMock.expectOne('http://path-to-your-api/users');
  //   postUserRequest.flush(mockPostUserResponse);

  //   expect(window.alert).toHaveBeenCalledWith('Signup is Success');
  //   expect(component.router.navigate).toHaveBeenCalledWith(['login']);
  // });

  // it('should handle existing user during signup', () => {
  //   const mockUserResponse = [{ email: 'test@example.com' }]; // Simulating an existing user
    

  //   // Mocking GET request to check for user existence
  //   component.signUp();
  //   const userExistRequest = httpMock.expectOne('http://localhost:3000/users');
  //   userExistRequest.flush(mockUserResponse);

  //   // Expect alert for existing user
  //   spyOn(window, 'alert');
  //   expect(window.alert).toHaveBeenCalledWith('Email is Already exist');
  // });

});
