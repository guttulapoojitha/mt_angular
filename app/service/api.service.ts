import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  postData(data: any) {
    return this.http.post<any>("http://localhost:3000/posts", data)
    

  }

  getData() {
    return this.http.get<any>("http://localhost:3000/posts")
    

  }
  getEmployeesById(id: any) {
    return this.http.get<any>('http://localhost:3000/posts/' + id)

  }


  updateData(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/posts/" + id, data)
   
  }

  deleteData(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts/" + id)
    
  }

  // login & Regestration
  getusers() {
    return this.http.get('http://localhost:3000/logindetails')
  }

  postusers(data: any) {
    return this.http.post('http://localhost:3000/logindetails', data)
  }

  postUsers(data: any) {
    return this.http.post('http://localhost:3000/users', data)

  }
  getUsers() {
    return this.http.get('http://localhost:3000/users')
  }

  getjobdetails() {
    return this.http.get('http://localhost:3000/jobdetails/')
  }

  postjobdetails(data: any) {
    return this.http.post('http://localhost:3000/jobdetails/', data)
  }

  deletejobdetails(id: any) {
    return this.http.delete('http://localhost:3000/jobdetails/' + id)
  }

  updatejobdetails(data: any, id: any) {
    return this.http.put('http://localhost:3000/jobdetails/' + id, data)
  }
  getEmployeeById(id: any) {
    return this.http.get<any>('http://localhost:3000/jobdetails/' + id)

  }
}



