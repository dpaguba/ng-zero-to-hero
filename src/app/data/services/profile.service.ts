import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageable } from '../interfaces/pageable.interface';
import { map, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http :HttpClient = inject(HttpClient);
  baseApiUrl = environment.API_URL
  
  me = signal<Profile | null>(null)

  constructor() { }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getMe(){
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(
          res => this.me.set(res)
        )
      )
  }

  getAccount(id: string){
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  getSubscribersShortList(subscribersAmount: number = 3){
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}account/subscribers/`)
    .pipe(
      map(res => res.items.slice(0, subscribersAmount))
    )
  }

  updateProfile(profile: Partial<Profile>){
    return this.http.patch(`${this.baseApiUrl}account/me`, profile)
  }

  uploadAvatar(avatar: File){
    const formData = new FormData();
    formData.append('image', avatar);
    return this.http.post(`${this.baseApiUrl}account/upload_image`, formData) 
  }
}
