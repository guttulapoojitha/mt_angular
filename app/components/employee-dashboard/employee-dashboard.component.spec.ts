import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiService } from 'src/app/service/api.service';
import { of } from 'rxjs';


describe('EmployeeDashboardComponent', () => {
  let component: EmployeeDashboardComponent;
  let fixture: ComponentFixture<EmployeeDashboardComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDashboardComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule,NgxPaginationModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reset form value and update show flags on addButtonClickFunction', () => {
    // Arrange: Set initial values
    component.showUpdate = true;
    component.showAdd = false;
    component.showUpdateTitle = true;
    spyOn(component.formValue, 'reset')
    // Act: Call the addButtonClickFunction
    component.addButtonClickFunction();

    // Assert: Check if the function behaves as expected
    expect(component.formValue.reset).toHaveBeenCalled(); // Assuming reset() is a spy or mock function
    expect(component.showUpdate).toBe(false);
    expect(component.showAdd).toBe(true);
    expect(component.showUpdateTitle).toBe(false);
  });

  

  // it('should update employee details and reset form on successful update', () => {
  //   // Arrange
  //   spyOn(component.formValue, 'reset'); // Spy on formValue reset method
  //   spyOn(component, 'getAllEmployee'); // Spy on getAllEmployee method

  //   const mockResponse = {}; // Mocking a successful response
  //   spyOn(apiService, 'updateData').and.returnValue(of(mockResponse)); // Mocking updateData method

  //   // Mocking document.getElementById
  //   const mockCancelElement = document.createElement('div');
  //   spyOn(document, 'getElementById').and.returnValue(mockCancelElement);
    

  //   // Set form values for testing
  //   component.formValue.setValue({
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     Email: 'john@example.com',
  //     Mobile: '1234567890',
  //     // Other necessary form values
      
  //   });

  //   // Act
  //   component.updateEmployeeDetails();

  //   // Assert
  //   expect(apiService.updateData).toHaveBeenCalledWith(component.employeeModelObj, component.employeeModelObj.id);
  //   expect(component.formValue.reset).toHaveBeenCalled();
  //   expect(component.getAllEmployee).toHaveBeenCalled();

  //   // Add more expectations based on the behavior after a successful update
  // });


});
