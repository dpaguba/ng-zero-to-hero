import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// make http call
export class ApiService {

  path: string = "http://localhost:3000/productList/"

  // inject httpClient
  constructor(private http: HttpClient) { }
  
  postProduct(data: any){
    return this.http.post<any>(this.path, data)
  }

  getProduct(){
    return this.http.get<any>(this.path)
  }

  putProduct(data: any, id: number){
    return this.http.put<any>(this.path + id, data)
  }

  deleteProduct(id: number){
    return this.http.delete<any>(this.path + id)
  }
}
