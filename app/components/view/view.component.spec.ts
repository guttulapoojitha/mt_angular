import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from '../employee-dashboard/employee-dashboard.model';
import swl from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let apiservice: ApiService;
  let employeeService: ViewComponent; 
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form values and update flags on add button click', () => {
    // Mock initial values
 
    component.showUpdate = true;
    component.showAdd = false;
    component.showUpdateTitle = true;
    component.showAddTitle = false;
    spyOn(component.formValue, 'reset')
    // Call the method
    component.addButtonClickFunction();


    // Check boolean flags
    expect(component.formValue.reset).toHaveBeenCalled(); // Assuming reset() is a spy or mock function

    expect(component.showUpdate).toBe(false);
    expect(component.showAdd).toBe(true);
    expect(component.showUpdateTitle).toBe(false);
    expect(component.showAddTitle).toBe(true);
  });


  it('should reset formValue on addButtonClick', () => {
    spyOn(component.formValue, 'reset'); // Spy on the reset method

    component.addButtonClickFunction();

    expect(component.formValue.reset).toHaveBeenCalled(); // Check if reset was called
  });

  it('should toggle visibility flags correctly on addButtonClick', () => {
    component.showUpdate = true;
    component.showAdd = false;
    component.showUpdateTitle = true;
    component.showAddTitle = false;

    component.addButtonClickFunction();

    expect(component.showUpdate).toBe(false);
    expect(component.showAdd).toBe(true);
    expect(component.showUpdateTitle).toBe(false);
    expect(component.showAddTitle).toBe(true);
  });


  it('should handle image file input via dataTransfer', () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const event = {
      dataTransfer: {
        files: [file],
      },
      target: null,
    };

    // spyOn(component, '_handleReaderLoaded');
    component.handleInputChange(event);
    // expect(component._handleReaderLoaded).toHaveBeenCalled();
  });

  it('should handle image file input via target', () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const event = {
      dataTransfer: null,
      target: {
        files: [file],
      },
    };

    // spyOn(component, '_handleReaderLoaded');
    component.handleInputChange(event);
    // expect(component._handleReaderLoaded).toHaveBeenCalled();
  });

  it('should show an alert for invalid file format', () => {
    const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    const event = {
      dataTransfer: {
        files: [file],
      },
      target: null,
    };

    spyOn(window, 'alert');
    component.handleInputChange(event);
    expect(window.alert).toHaveBeenCalledWith('invalid format');
  });

  it('should set showUpdate and call ApiService when paramsId exists', () => {
    const dummyId = '123'; // Replace with a sample ID for testing
    component.paramsId = dummyId;

    spyOn(component.formValue.controls['firstName'], 'setValue');
    spyOn(component.formValue.controls['lastName'], 'setValue');
    spyOn(component.formValue.controls['Email'], 'setValue');
    spyOn(component.formValue.controls['Mobile'], 'setValue');

    const dummyEmployee = {
      firstName: 'John',
      lastName: 'Doe',
      Email: 'john@example.com',
      Mobile: '1234567890'
    };

    spyOn(apiservice, 'getEmployeesById').and.returnValue(of(dummyEmployee));

    component.getDetailsById();

    expect(component.showUpdate).toBeTruthy();
    expect(component.showAdd).toBeFalsy();

    expect(apiservice.getEmployeesById).toHaveBeenCalledWith(dummyId);
    expect(component.formValue.controls['firstName'].setValue).toHaveBeenCalledWith(dummyEmployee.firstName);
    expect(component.formValue.controls['lastName'].setValue).toHaveBeenCalledWith(dummyEmployee.lastName);
    expect(component.formValue.controls['Email'].setValue).toHaveBeenCalledWith(dummyEmployee.Email);
    expect(component.formValue.controls['Mobile'].setValue).toHaveBeenCalledWith(dummyEmployee.Mobile);
  });

  it('should set showAdd when paramsId does not exist', () => {
    component.paramsId = null;

    component.getDetailsById();

    expect(component.showUpdate).toBeFalsy();
    expect(component.showAdd).toBeTruthy();
  });

  it('should update employee data correctly', () => {
    const row = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      Email: 'john@example.com',
      Mobile: '1234567890'
    };

    component.updateEmployee(row);

    expect(component.showUpdate).toBe(true);
    expect(component.showAdd).toBe(false);
    expect(component.showUpdateTitle).toBe(true);
    expect(component.showAddTitle).toBe(false);
    
    // Test if the form values are correctly set
    expect(component.employeeModelObj.id).toBe(1);
    expect(component.formValue.controls['firstName'].value).toBe('John');
    expect(component.formValue.controls['lastName'].value).toBe('Doe');
    expect(component.formValue.controls['Email'].value).toBe('john@example.com');
    expect(component.formValue.controls['Mobile'].value).toBe('1234567890');
  });

  it('should update employee details and navigate to dashboard', () => {
    // Mock form values
    component.formValue.setValue({
      firstName: 'John',
      lastName: 'Doe',
      Email: 'john@example.com',
      Mobile: '1234567890',
    });


    // Call the method
    component.updateEmployeeDetails();

    // Check if service method was called with the correct arguments
    expect(employeeService.updateData).toHaveBeenCalledWith(
      component.employeeModelObj,
      // component.paramsId
    );

    // Check if the form was reset
    expect(component.formValue.value).toEqual({
      firstName: '',
      lastName: '',
      Email: '',
      Mobile: '',
    });

    // Check if getDetailsById and router.navigate were called
    expect(component.getDetailsById).toHaveBeenCalled();
    // expect(component.router.navigate).toHaveBeenCalledWith(['/employee-dashboard']);

    // You can add more expectations based on your specific logic
  });

  it('should navigate to employee dashboard', () => {
    spyOn(router, 'navigate'); // Spy on the router.navigate method

    component.navigateToDashboard();

    expect(router.navigate).toHaveBeenCalledWith(['/employee-dashboard']);
  });

  it('should update employee correctly', () => {
    // Mock a sample row object
    const row = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      Email: 'john@example.com',
      Mobile: '1234567890'
    };

    // Trigger the method
    component.updateEmployee(row);

    // Assertions
    expect(component.showUpdate).toBe(true);
    expect(component.showAdd).toBe(false);
    expect(component.showUpdateTitle).toBe(true);
    expect(component.showAddTitle).toBe(false);
    expect(component.employeeModelObj.id).toBe(row.id);
    expect(component.formValue.controls['firstName'].value).toBe(row.firstName);
    expect(component.formValue.controls['lastName'].value).toBe(row.lastName);
    expect(component.formValue.controls['Email'].value).toBe(row.Email);
    expect(component.formValue.controls['Mobile'].value).toBe(row.Mobile);
  });

});
