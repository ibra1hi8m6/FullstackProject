import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiurl}/Order`;
  constructor(private http: HttpClient) { }

   createOrder(order: any) {
    return this.http.post(`${this.baseUrl}`, order);
  }

  getOrderById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getOrdersByUser(userId: string) {
    return this.http.get(`${this.baseUrl}/user/${userId}/orders`);
  }

  updateOrderStatus(id: number, status: string) {
    return this.http.put(`${this.baseUrl}/${id}/status`, status);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
