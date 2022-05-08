import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// make http call
export class ApiService {

  // inject httpClient
  constructor(private http: HttpClient) { }
  postProduct(){
    return this.http.post<any>("")
  }
}
