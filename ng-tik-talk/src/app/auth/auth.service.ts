import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators'; // Import the 'tap' operator from 'rxjs/operators' instead of 'rxjs'.
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string = environment.API_URL + 'auth/'
;  token: string | null = null;
  refresh_token: string | null = null;

  http: HttpClient = inject(HttpClient);
  cookieService: CookieService = inject(CookieService);
  router: Router = inject(Router);

  get isAuthenticated(): boolean{

    if(!this.token){
      this.token = this.cookieService.get('token');
      this.refresh_token = this.cookieService.get('refresh_token')
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
        this.saveTokens(val);
      })
    )
  }

  logout(){
    this.token = null;
    this.refresh_token = null;
    // this.cookieService.deleteAll(); or delete only token and refresh_token
    this.cookieService.delete('token');
    this.cookieService.delete('refresh_token');
    this.router.navigate(['/login']);
  
  }

  refreshToken(){
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}refresh`,
      {
        refresh_token: this.refresh_token
      }
    ).pipe(
      tap((val: TokenResponse) => {
        this.saveTokens(val);
      }),
      catchError((err) => {
        this.logout();
        return throwError(err);
      }
    ))
  }

  saveTokens(response: TokenResponse){
    this.token = response.access_token;
    this.refresh_token = response.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refresh_token', this.refresh_token);
  }
}
