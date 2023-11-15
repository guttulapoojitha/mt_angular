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

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

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
    // component.formValue = { /* Mock form value */ };
    component.showUpdate = true;
    component.showAdd = false;
    component.showUpdateTitle = true;
    component.showAddTitle = false;
    spyOn(component.formValue, 'reset')
    // Call the method
    component.addButtonClickFunction();

    // Check if the formValue has been reset
    // expect(component.formValue).toEqual({}); // Assuming formValue should be an empty object after reset

    // Check boolean flags
    expect(component.formValue.reset).toHaveBeenCalled(); // Assuming reset() is a spy or mock function

    expect(component.showUpdate).toBe(false);
    expect(component.showAdd).toBe(true);
    expect(component.showUpdateTitle).toBe(false);
    expect(component.showAddTitle).toBe(true);
  });

});
