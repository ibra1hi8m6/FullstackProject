import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
export enum UserRole {
  Admin = 0, // Enums in TypeScript are numbered by default, but it's good practice to be explicit
  User = 1,
  Manager = 2,
  Cashier = 3
}

export interface Address {
  id?: number;
  description: string;
  areaName?: string;
  streetName?: string;
  buildingNumber?: string;
  floorNumber?: string;
  flatNumber?: string;
}
export interface RegisterModel {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  role: number;
  address: Address;
}
export interface LoginModel {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiurl}/Auth`; // your backend API

  constructor(private http: HttpClient, private cookieService: CookieService) {}

    register(model: RegisterModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, model);
  }

  login(model: LoginModel): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, model).pipe(
      tap(res => {
        if (res && res.token) {
          this.cookieService.set('jwt', res.token, 1, '/'); // 1 day expiry
        }
      })
    );
  }

   logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}).pipe(
      tap(() => this.clearToken())
    );
  }
    clearToken() {
    this.cookieService.delete('jwt');
  }
 getToken() {
    return this.cookieService.get('jwt');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
