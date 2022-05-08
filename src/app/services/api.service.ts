import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// make http call
export class ApiService {

  // inject httpClient
  constructor(private http: HttpClient) { }
  
  postProduct(data: any){
    return this.http.post<any>("http://localhost:3000/productList/", data)
  }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList")
  }
}
