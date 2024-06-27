import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'; // Import the 'tap' operator from 'rxjs/operators' instead of 'rxjs'.
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseApiUrl: string ='https://icherniakov.ru/yt-course/auth/'
  token: string | null = null;
  refreshToken: string | null = null;

  http: HttpClient = inject(HttpClient);
  cookieService: CookieService = inject(CookieService);

  get isAuthenticated(): boolean{

    if(!this.token){
      this.token = this.cookieService.get('token');
    }

    return !!this.token;
  }

  constructor() { }

  login(payload: {username: string, password: string}){

    const fd: FormData = new FormData();
    fd.append("username", payload.username)
    fd.append("password", payload.password)
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`,
      fd
    ).pipe(
      tap((val: TokenResponse) => {
        this.token = val.access_token;
        this.refreshToken = val.refresh_token;

        this.cookieService.set('token', this.token);
        this.cookieService.set('refreshToken', this.refreshToken);
      })
    )
  }
}
