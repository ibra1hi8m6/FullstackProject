import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/Authentication/Auth/auth.service';
import { CartService, Cart } from '../../../../shared/services/Cart/cart.service';
import { MealService } from '../../../../shared/services/Meals/meal.service';
import { SizeService } from '../../../../shared/services/Sizes/size.service';
import { CouponService } from '../../../../shared/services/Coupon/coupon.service';
import { OrderService } from '../../../../shared/services/Orders/order.service';
import { forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddressService } from '../../../../shared/services/User/address.service';
export interface MealDTO {
  mealId: number;
  nameEnglish: string;
  nameArabic: string;
  imageFileBase64: string;
  mealSizes: MealSizeDTO[];
}

export interface MealSizeDTO {
  sizeId: number;
  price: number;
  nameEnglish: string;
}

export interface SizeDTO {
  sizeId: number;
  nameEnglish: string;
}
export interface AddressReadDto {
  id: number;
  description: string;
  areaName?: string;
  streetName?: string;
  buildingNumber?: string;
  floorNumber?: string;
  flatNumber?: string;
}

export interface DetailedCartItem {
  cartItemId: number;
  mealId: number;
  quantity: number;
  mealDetails: MealDTO;
  sizeDetails: SizeDTO;
  subtotal: number;
}

@Component({
  selector: 'app-order-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.css'],
})
export class OrderCheckoutComponent implements OnInit {
  userId: string | null = null;
  cart: Cart | null = null;
  detailedCartItems: DetailedCartItem[] = [];
  totalPrice = 0;
orderDescription: string = "";
  coupons: any[] = [];
  appliedCoupon: any = null;
userAddresses: AddressReadDto[] = [];
  selectedAddressId: number | null = null;
  selectedPaymentMethod: number = 1; // Default Cash
  selectedReceiveType: number = 1;   // Default Delivery
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private mealService: MealService,
    private sizeService: SizeService,
    private addressService: AddressService,
    private couponService: CouponService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.initCheckout();
}

private initCheckout(): void {
 const claims = this.authService.getClaims();
  const role = claims ? claims['role'] : null;

  if (role === 'Cashier') {
    this.userId = localStorage.getItem('selectedUserId'); // ID of the customer selected by cashier
  } else {
    this.userId = claims ? claims['UserID'] : null; // logged-in user
  }

  if (!this.userId) {
    this.router.navigate(['/auth/login']);
    return;
  }

  this.loadUserAddresses();
  this.loadCoupons();
  this.loadCart();
}

private loadUserAddresses(): void {
  this.addressService.getAddressesByUser(this.userId!).subscribe({
    next: (addresses: AddressReadDto[]) => {
      this.userAddresses = addresses;
    },
    error: (err) => console.error('Failed to load addresses:', err),
  });
}

  // ✅ load cart and hydrate with meals + sizes
  loadCart() {
    this.cartService.getActiveCartByUser(this.userId!).subscribe({
      next: (activeCart) => {
        this.cart = {
          ...activeCart,
          cartItems: activeCart.cartItems || [],
        };
        this.fetchDetailedCartItems();
      },
      error: (err) => {
        console.error('Failed to load active cart:', err);
        this.cart = null;
        this.detailedCartItems = [];
      },
    });
  }

  fetchDetailedCartItems() {
    if (!this.cart || this.cart.cartItems.length === 0) {
      this.detailedCartItems = [];
      this.calculateTotal();
      return;
    }

    const itemRequests = this.cart.cartItems.map((item) =>
      forkJoin({
        meal: this.mealService.GetMealByID(item.mealId),
        size: this.sizeService.GetSizeById(item.sizeId),
      }).pipe(
        map(({ meal, size }) => {
          const mealSize = meal.mealSizes.find((ms: any) => ms.sizeId === item.sizeId);
          const price = mealSize ? mealSize.price : 0;
          const subtotal = price * item.quantity;

          return {
            ...item,
            mealDetails: meal,
            sizeDetails: size,
            subtotal: subtotal,
          } as DetailedCartItem;
        }),
        catchError((error) => {
          console.error(`Error fetching details for meal ${item.mealId}:`, error);
          return of(null);
        })
      )
    );

    forkJoin(itemRequests).subscribe((results) => {
      this.detailedCartItems = results.filter((r) => r !== null) as DetailedCartItem[];
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.detailedCartItems.reduce((sum, item) => sum + item.subtotal, 0);
    if (this.appliedCoupon) {
      this.totalPrice = this.totalPrice - (this.totalPrice * this.appliedCoupon.discountPercentage) / 100;
    }
  }

  // ✅ Coupons
  loadCoupons() {
    this.couponService.getCoupons().subscribe((res: any) => {
      this.coupons = res;
    });
  }

  applyCoupon(code: string) {
    this.couponService.validateCoupon(code).subscribe((res: any) => {
      if (res.isValid) {
        this.appliedCoupon = this.coupons.find((c) => c.code === code);
        this.calculateTotal();
        alert(`Coupon applied: ${code}`);
      } else {
        alert('Invalid coupon');
      }
    });
  }

  // ✅ Checkout
  checkout() {
    if (!this.cart || this.detailedCartItems.length === 0) {
      alert('Cart is empty.');
      return;
    }

const claims = this.authService.getClaims();
  const role = claims ? claims['role'] : null;
  const userId =
  role === 'Cashier'
    ? localStorage.getItem('selectedUserId') || null
    : claims
    ? claims['UserID']
    : null;
    const orderData = {

      userId: this.userId,
       createdBy: role,
      subTotal: this.detailedCartItems.reduce((sum, item) => sum + item.subtotal, 0),
      discountAmount: this.appliedCoupon
        ? (this.totalPrice * this.appliedCoupon.discountPercentage) / 100
        : 0,
      totalPrice: this.totalPrice,
      paymentMethod: this.selectedPaymentMethod, // set from dropdown (e.g. Cash/Card/Wallet)
      couponId: this.appliedCoupon ? this.appliedCoupon.id : null,
      addressId: this.selectedAddressId,
      receiveType: this.selectedReceiveType,
      description: this.orderDescription,

    };

    this.orderService.createOrder(orderData).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.appliedCoupon = null;
        this.detailedCartItems = [];
        this.cart = null;
        this.totalPrice = 0;
        this.orderDescription = "";
        this.selectedAddressId = null;
        this.selectedReceiveType = 1;
        this.selectedPaymentMethod = 1;
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        console.error('Failed to place order', err);
        alert('Order failed. Please try again.');
      },
    });
  }
}
