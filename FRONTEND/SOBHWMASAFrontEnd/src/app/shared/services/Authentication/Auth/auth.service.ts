import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { TOKEN_KEY } from '../../../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private baseUrl = `${environment.apiurl}/Auth`;

  createUser(formData: any) {
    return this.http.post(`${this.baseUrl}/register`, formData);
  }

  signin(formData: any) {
    return this.http.post(`${this.baseUrl}/login`, formData);
  }

  isLoggedIn() {
    return this.getToken() != null ? true : false;
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

getUserByPhone(phoneNumber: string) {
  return this.http.get<any>(`${this.baseUrl}/by-phone/${phoneNumber}`);
}
  getClaims() {
    const token = this.getToken();
  if (!token) {
    return null;
  }
  return JSON.parse(window.atob(token.split('.')[1]));
  }
}
