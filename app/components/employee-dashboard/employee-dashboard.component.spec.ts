import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiService } from 'src/app/service/api.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 


describe('EmployeeDashboardComponent', () => {
  let component: EmployeeDashboardComponent;
  let fixture: ComponentFixture<EmployeeDashboardComponent>;
  let apiService: ApiService;
  let httpMock: HttpTestingController; 
  let service: EmployeeDashboardComponent; 
  let apiServiceMock: any; 
  let router: Router;
  let mockedSwal: { fire: any; };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDashboardComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule,NgxPaginationModule],
      providers: [
        { provide: ApiService, useValue: apiServiceMock }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashboardComponent);
    component = fixture.componentInstance;
    mockedSwal = {
      fire: jasmine.createSpy().and.returnValue(Promise.resolve({ isConfirmed: true }))
    };
    // spyOn(window, 'swal').and.returnValue(mockedSwal);
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

  it('should reset form value and set flags correctly on button click', () => {
    // Arrange: Set initial values or conditions
    component.formValue.setValue({
      // Provide necessary form field values here if applicable
    });
    component.showUpdate = true;
    component.showAdd = false;
    component.showUpdateTitle = true;
    spyOn(component.formValue, 'reset')
    // Act: Simulate the button click
    component.addButtonClickFunction();

    // Assert: Check if the function performed as expected
    expect(component.formValue.value).toEqual({}); // Check if the form was reset
    expect(component.showUpdate).toBe(false); // Check if showUpdate is set to false
    expect(component.showAdd).toBe(true); // Check if showAdd is set to true
    expect(component.showUpdateTitle).toBe(false); // Check if showUpdateTitle is set to false
  });

  it('should post employee details if email and mobile do not exist', () => {
    // Mock form values
    // component.formValue = {
    //   value: {
    //     id: 1,
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'john@example.com',
    //     mobile: '1234567890',
    //     // ... other form values
    //   },
    //   reset: () => {}, // Mock reset function
    // };

    // Mock API response without any user with the same email or mobile
    const mockApiResponse = [{ email: 'other@example.com', mobile: '9876543210' }];
    // component.http.get('http://localhost:3000/posts').subscribe((res) => {
    //   expect(res).toEqual(mockApiResponse);
    // });

    // Trigger the function
    component.postEmployeeDetails();

    // Expectations
    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

    // Mock API response after posting data
    const postData = { /* mock post data */ };
    const mockPostResponse = { /* mock response after posting data */ };
    spyOn(apiService, 'postData').and.returnValue(of(mockPostResponse));

    component.postEmployeeDetails();

    expect(apiService.postData).toHaveBeenCalledWith(postData);
    // ... other expectations for success scenario
  });

  it('should fetch employee data successfully', () => {
    const mockEmployeeData = [{ id: 1, name: 'Anil' }]; // Mock employee data

    // apiService.getData.and.returnValue(of(mockEmployeeData)); // Mocking the API call with a fake data Observable

    service.getAllEmployee();

    expect(apiService.getData).toHaveBeenCalled(); // Ensure getData() method was called
    expect(service.employeeData).toEqual(mockEmployeeData); // Check if employeeData was assigned correctly
  });

  it('should update employee and navigate to the correct view', () => {
    const row = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      Email: 'john@example.com',
      Mobile: '1234567890',
    };

    // Mock form values
    const formValue = component.formValue as FormGroup;
    formValue.controls['firstName'].setValue('');
    formValue.controls['lastName'].setValue('');
    formValue.controls['Email'].setValue('');
    formValue.controls['Mobile'].setValue('');

    spyOn(router, 'navigate').and.stub();

    component.updateEmployee(row);

    expect(component.showUpdate).toBe(true);
    expect(component.showAdd).toBe(false);
    expect(component.showUpdateTitle).toBe(true);
    expect(component.showAddTitle).toBe(false);
    expect(component.employeeModelObj.id).toBe(1);
    expect(formValue.controls['firstName'].value).toBe('John');
    expect(formValue.controls['lastName'].value).toBe('Doe');
    expect(formValue.controls['Email'].value).toBe('john@example.com');
    expect(formValue.controls['Mobile'].value).toBe('1234567890');
    expect(router.navigate).toHaveBeenCalledWith(['/view/1']);
  });

  it('should update employee details and reset form on successful update', () => {
    const mockEmployee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      Email: 'john@example.com',
      Mobile: '1234567890'
    };

    spyOn(apiService, 'updateData').and.returnValue(of(true)); // Mock the updateData method

    component.formValue.setValue(mockEmployee); // Set form values

    component.updateEmployeeDetails();

    expect(apiService.updateData).toHaveBeenCalledWith(mockEmployee, mockEmployee.id);
    expect(component.formValue.value).toEqual(null); // Ensure form is reset
    // Add more expectations as needed
  });

  it('should handle error scenario during update', () => {
    const errorResponse = { status: 404, message: 'Not Found' };

    spyOn(apiService, 'updateData').and.returnValue(throwError(errorResponse)); // Mock error response

    // Set form values, similar to the successful scenario

    component.updateEmployeeDetails();

    expect(apiService.updateData).toHaveBeenCalled();
    // Add expectations for error handling (e.g., alert/message handling)
    // You can also check that the form is not reset in case of an error
  });

  it('should delete data and show success message', fakeAsync(() => {
    spyOn(Swal, 'fire').and.callThrough(); // Mocking SweetAlert fire method

    const idToDelete = 'your-id-to-delete';
    component.DeleteData(idToDelete);

    tick(); // Simulate the passage of time for asynchronous operations

    // expect(apiService.deleteData).toHaveBeenCalledWith(idToDelete);
    expect(component.getAllEmployee).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith('Deleted!', 'Your file has been deleted.', 'success');
  }));

  it('should handle error when deletion fails', fakeAsync(() => {
    spyOn(window, 'alert'); // Mocking the alert method

    const idToDelete = 'your-id-to-delete';
    const errorMessage = 'Deletion failed';
    spyOn(apiService, 'deleteData').and.returnValue(throwError(errorMessage)); // Mocking error response

    component.DeleteData(idToDelete);

    tick(); // Simulate the passage of time for asynchronous operations

    // expect(apiService.deleteData).toHaveBeenCalledWith(idToDelete);
    expect(window.alert).toHaveBeenCalledWith('something went wrong');
  }));

  it('should call DeleteData when confirmed', async () => {
    const idToDelete = 123;
    // await deleteEmployee(idToDelete);
    expect(mockedSwal.fire).toHaveBeenCalledOnceWith({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    // expect(DeleteData).toHaveBeenCalledWith(idToDelete);
  });

  it('should not call DeleteData when canceling', async () => {
    mockedSwal.fire.and.returnValue(Promise.resolve({ isConfirmed: false }));
    const idToDelete = 123;
    // await deleteEmployee(idToDelete);
    // expect(DeleteData).not.toHaveBeenCalled();
  });

  it('should navigate to login page after logout', () => {
    const navigateSpy = spyOn(router, 'navigate');

    service.logout();

    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });




});


