import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

import { HttpHeaders } from '@angular/common/http';
export interface CartItem {
  cartItemId?: number; // Add this since the backend now returns it
  mealId: number;
  sizeId: number;
  quantity: number;
  status: boolean;
}

export interface Cart {
  cartId?: number; // Add this since the backend now returns it

  status: boolean;
  cartItems: CartItem[];
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = `${environment.apiurl}/Cart`;

  constructor(private http: HttpClient) {}
  createCart(cartDto: Cart, userId?: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/create/${userId}`, cartDto);
  }

  getActiveCartByUser(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/active/${userId}`);
  }

 
  getCartById(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/${cartId}`);
  }
  deleteItemFromCart(cartId: number, cartItemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${cartId}/item/${cartItemId}`);
  }
  clearCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${cartId}/clear`);
  }
}
