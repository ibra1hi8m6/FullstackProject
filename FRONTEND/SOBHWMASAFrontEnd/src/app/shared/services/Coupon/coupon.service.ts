import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private baseUrl = `${environment.apiurl}`;
  constructor(private http: HttpClient) { }
  createCoupon(coupon: any) {
    return this.http.post(`${this.baseUrl}/Coupon`, coupon);
  }

  getCoupons() {
    return this.http.get(`${this.baseUrl}/Coupon`);
  }

  getCouponById(id: number) {
    return this.http.get(`${this.baseUrl}/Coupon/${id}`);
  }

  validateCoupon(code: string) {
    return this.http.get(`${this.baseUrl}/Coupon/validate/${code}`);
  }

  updateCoupon(id: number, coupon: any) {
    return this.http.put(`${this.baseUrl}/Coupon/${id}`, coupon);
  }

  softDeleteCoupon(id: number) {
    return this.http.delete(`${this.baseUrl}/Coupon/${id}`);
  }
}
