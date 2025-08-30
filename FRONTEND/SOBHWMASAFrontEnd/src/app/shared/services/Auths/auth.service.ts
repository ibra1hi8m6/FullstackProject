import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private tokenKey = 'jwtToken';
  constructor(private http: HttpClient, private cookieService: CookieService) {}

    register(model: RegisterModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, model);
  }
 login(model: LoginModel): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, model).pipe(
      tap(res => {
        if (res && res.token) {
          // Save token in cookies
          this.setToken(res.token);
        }
      })
    );
  }
  //  logout(): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/logout`, {}).pipe(
  //     tap(() => this.clearToken())
  //   );
  // }
    logout(): void {
    this.clearToken();

  }
    clearToken(): void {
    this.cookieService.delete(this.tokenKey, '/'); // delete token from cookie
  }

   getToken(): string | null {
    return localStorage.getItem('jwtToken'); // Or from CookieService if you prefer
  }
setToken(token: string): void {
  this.cookieService.set('jwt', token, {
    path: '/',
    secure: true,      // required if using HTTPS
    sameSite: 'None'   // important for cross-origin requests
  });
}
 isAuthenticated(): boolean {
    return !!this.getToken();
  }

     authHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }
}
