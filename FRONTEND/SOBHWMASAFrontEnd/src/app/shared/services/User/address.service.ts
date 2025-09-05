import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AddressReadDto } from '../../../features/order/user-order/order-checkout/order-checkout.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private baseUrl = `${environment.apiurl}/Address`;

  constructor(private http: HttpClient) {}

  createAddress(dto: any) {
    return this.http.post(`${this.baseUrl}`, dto);
  }

  getAddressesByUser(userId: string): Observable<AddressReadDto[]> {
    return this.http.get<AddressReadDto[]>(`${this.baseUrl}/user/${userId}`);
  }

  getAddressById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateAddress(id: number, dto: any) {
    return this.http.put(`${this.baseUrl}/${id}`, dto);
  }

  deleteAddress(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
