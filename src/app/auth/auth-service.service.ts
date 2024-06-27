import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  http: HttpClient = inject(HttpClient);
  baseApiUrl: string ='https://icherniakov.ru/yt-course/auth/'

  constructor() { }

  login(payload: {username: string, password: string}){

    const fd: FormData = new FormData();
    fd.append("username", payload.username)
    fd.append("password", payload.password)
    return this.http.post(
      `${this.baseApiUrl}token`,
      fd
    )
  }
}
