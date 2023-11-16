import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let httpTestingController: HttpTestingController;
  let yourService: ApiService;
  let httpClientSpy: { put: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule,]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post data', () => {
    const testData = { /* Your test data object */ };
    service.postData(testData).subscribe(response => {
      expect(response).toBeTruthy(); // Assuming your server responds with a truthy value on success
      // You can add more expectations based on your server's response
    });

    const request = httpMock.expectOne('http://localhost:3000/posts');
    expect(request.request.method).toBe('POST');
    // Optionally, you can expect/request.flush() with a mocked response from the server
    // request.flush(mockedResponse);
  });

  it('should retrieve data from the API via GET', () => {
    const mockData = [{ id: 1, title: 'Test Post' }];

    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });

  it('should fetch employee data by ID', () => {
    const mockEmployee = { id: 1, name: 'John Doe' }; // Replace with your mock data
    const id = 1; // Replace with the ID you want to test

    yourService.getEmployeesById(id).subscribe((data) => {
      expect(data).toEqual(mockEmployee); // Assuming the response should match the mock data
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/posts/${id}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockEmployee); // Simulate a successful HTTP response
  });

  it('should update data via PUT request', () => {
    const id = 1;
    const mockData = { /* your mock data here */ };

    service.updateData(mockData, id).subscribe(response => {
      expect(response).toEqual(mockData); // Assuming response is the updated data
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockData); // Respond with mockData
  });

  it('should update data via PUT request', () => {
    const id = 1;
    const mockData = { /* your mock data here */ };
    httpClientSpy.put.and.returnValue(of(mockData));

    service.updateData(mockData, id).subscribe(response => {
      expect(response).toEqual(mockData); // Assuming response is the updated data
    });

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    expect(httpClientSpy.put.calls.mostRecent().args[0]).toBe(`http://localhost:3000/posts/${id}`);
  });

  it('should delete data by ID', () => {
    const idToDelete = 1; // Replace with an ID to test deletion

    service.deleteData(idToDelete).subscribe(response => {
      expect(response).toBeTruthy(); // Assuming a successful deletion returns truthy value
    });

    const request = httpMock.expectOne(`http://localhost:3000/posts/${idToDelete}`);
    expect(request.request.method).toBe('DELETE');
    request.flush({}); // Respond with an empty object for a successful deletion
  });

  it('should retrieve login details via HTTP GET', () => {
    const mockData: string | number | boolean | { constructor: jasmine.ExpectedRecursive<Function>; toString: jasmine.ExpectedRecursive<() => string>; toLocaleString: jasmine.ExpectedRecursive<() => string>; valueOf: jasmine.ExpectedRecursive<() => Object>; hasOwnProperty: jasmine.ExpectedRecursive<(v: PropertyKey) => boolean>; isPrototypeOf: jasmine.ExpectedRecursive<(v: Object) => boolean>; propertyIsEnumerable: jasmine.ExpectedRecursive<(v: PropertyKey) => boolean>; } | null = [
      /* Mock data that you expect to receive from the API */
    ];

    service.getUsers().subscribe(data => {
      expect(data).toEqual(mockData); // Assert that the returned data matches the expected mock data
    });

    const req = httpMock.expectOne('http://localhost:3000/logindetails');
    expect(req.request.method).toBe('GET'); // Assert that a GET request was made to the correct URL

    // req.flush(mockData); // Simulate a successful response with the mock data
  });

  it('should post user data', () => {
    const testData = { username: 'testuser', password: 'testpassword' };

    service.postusers(testData).subscribe(response => {
      expect(response).toBeTruthy(); // Add more assertions based on your expected response
    });

    const req = httpMock.expectOne('http://localhost:3000/logindetails');
    expect(req.request.method).toBe('POST');
    req.flush({ /* Your mock response */ }); // Provide a mock response if needed
  });

  it('should call http.post with correct URL and data', () => {
    const data = { /* your test data */ };
    const httpSpy = spyOn(TestBed.inject(HttpClient), 'post').and.returnValue(of('')); // Mock the http.post method
  
    service.postUsers(data);
  
    expect(httpSpy).toHaveBeenCalledWith('http://localhost:3000/users', data);
  });

  it('should return an Observable', () => {
    const data = { /* your test data */ };
  
    const result = service.postUsers(data);
  
    expect(result).toEqual(jasmine.any(Observable));
  });

  it('should handle HTTP errors', () => {
    const data = { /* your test data */ };
    const errorResponse = { status: 404, statusText: 'Not Found' };
    const httpSpy = spyOn(TestBed.inject(HttpClient), 'post').and.returnValue(throwError(errorResponse)); // Mock an error response
  
    service.postUsers(data).subscribe(
      () => {},
      (error) => {
        expect(error).toEqual(errorResponse);
      }
    );
  });

  it('should handle errors when retrieving users', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found' };
    const data = 'Invalid request';

    httpMock.expectOne('http://localhost:3000/users').flush(data, mockErrorResponse);

    service.getUsers().subscribe(
      () => {},
      (      error: { status: any; statusText: any; }) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    );

    httpMock.verify();
  });

  it('should retrieve job details via GET', () => {
    const mockJobDetails: string | number | boolean | { constructor: jasmine.ExpectedRecursive<Function>; toString: jasmine.ExpectedRecursive<() => string>; toLocaleString: jasmine.ExpectedRecursive<() => string>; valueOf: jasmine.ExpectedRecursive<() => Object>; hasOwnProperty: jasmine.ExpectedRecursive<(v: PropertyKey) => boolean>; isPrototypeOf: jasmine.ExpectedRecursive<(v: Object) => boolean>; propertyIsEnumerable: jasmine.ExpectedRecursive<(v: PropertyKey) => boolean>; } | null = [
      // Mock job details data you expect to receive
      // Example: { id: 1, title: 'Job Title', description: 'Job Description' }
    ];

    service.getjobdetails().subscribe((data) => {
      expect(data).toEqual(mockJobDetails); // Assert that the returned data matches the expected mock data
    });

    const req = httpMock.expectOne('http://localhost:3000/jobdetails/');
    expect(req.request.method).toBe('GET'); // Assert that a GET request was made
    // req.flush(mockJobDetails); // Simulate the server sending the mock data in response
  });

  it('should post job details', () => {
    const mockJobDetails = { /* Your mock job details object */ };
    const mockResponse = { /* Your mock response object */ };

    service.postjobdetails(mockJobDetails).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/jobdetails/');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should delete job details by ID', () => {
    const jobId = 'example_id'; // Replace 'example_id' with a valid job ID

    service.deletejobdetails(jobId).subscribe(() => {
      // Expect that the HTTP request was made to the correct URL
      const req = httpMock.expectOne('http://localhost:3000/jobdetails/' + jobId);
      expect(req.request.method).toBe('DELETE');
      req.flush({}); // Respond with an empty object for a successful deletion
    });
  });

  it('should handle errors when deleting job details', () => {
    const jobId = 'invalid_id'; // Replace 'invalid_id' with an invalid job ID

    service.deletejobdetails(jobId).subscribe(
      () => {
        // If the deletion is successful, this block shouldn't run
        fail('Expected the request to fail');
      },
      (error) => {
        expect(error.status).toBe(404); // Replace 404 with the expected error status
        // You can add more detailed checks on the error response if needed
      }
    );

    const req = httpMock.expectOne('http://localhost:3000/jobdetails/' + jobId);
    req.flush('Error', { status: 404, statusText: 'Not Found' });
  });

  it('should update job details', () => {
    const mockData = { /* Your mock data here */ };
    const mockId = 1; // Replace with the desired ID

    service.updatejobdetails(mockData, mockId).subscribe(result => {
      expect(result).toBeTruthy(); // Add your specific expectations here
    });

    const req = httpMock.expectOne(`http://localhost:3000/jobdetails/${mockId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockData);

    req.flush({ /* Your mock response here */ });
  });

  it('should fetch employee details via HTTP GET', () => {
    const dummyEmployee = { id: 1, name: 'John Doe' };
    const id = 1;

    service.getEmployeeById(id).subscribe(employee => {
      expect(employee).toEqual(dummyEmployee);
    });

    const request = httpMock.expectOne('http://localhost:3000/jobdetails/' + id);
    expect(request.request.method).toBe('GET');

    request.flush(dummyEmployee);
  });
 
});
