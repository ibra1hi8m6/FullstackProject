import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/Authentication/Auth/auth.service';
import { OrderService } from '../../../shared/services/Orders/order.service';
import { AddressService } from '../../../shared/services/User/address.service';
import { CartService } from '../../../shared/services/Cart/cart.service';

@Component({
  selector: 'app-cashier-order',
  standalone: true,
  templateUrl: './cashier-order.component.html',
  styleUrls: ['./cashier-order.component.css'],
})
export class CashierOrderComponent {
  phoneNumber: string = '';
  customer: any = null;  // { userId, firstName, secondName }
  cart: any = null;
  detailedCartItems: any[] = [];
  totalPrice = 0;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private addressService: AddressService,
    private cartService: CartService,
    private router: Router
  ) {}

  // ✅ Step 1: Find customer by phone
  findCustomer() {
    if (!this.phoneNumber) {
      alert('Enter phone number');
      return;
    }

    this.authService.getUserByPhone(this.phoneNumber).subscribe({
      next: (res) => {
        this.customer = res;
        console.log('Customer found:', this.customer);

        // load customer's cart
        this.loadCustomerCart(this.customer.userId);
      },
      error: () => {
        alert('Customer not found!');
      },
    });
  }

  // ✅ Step 2: Load cart for that user
  loadCustomerCart(userId: string) {
    this.cartService.getActiveCartByUser(userId).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.detailedCartItems = cart.cartItems;
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Failed to load cart:', err);
        this.cart = null;
        this.detailedCartItems = [];
      },
    });
  }

  calculateTotal() {
    this.totalPrice = this.detailedCartItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
  }

  // ✅ Step 3: Checkout on behalf of user
  checkoutForCustomer() {
    if (!this.cart || this.detailedCartItems.length === 0) {
      alert('Cart is empty.');
      return;
    }

    const cashierClaims = this.authService.getClaims(); // cashier’s claims
    const cashierRole = cashierClaims ? cashierClaims["role"] : null;
    const cashierName = cashierClaims ? cashierClaims["unique_name"] : null;

    const orderData = {
      userId: this.customer.userId,   // ✅ Customer ID
      createdBy: cashierName,         // ✅ Cashier creating order
      subTotal: this.totalPrice,
      discountAmount: 0,
      totalPrice: this.totalPrice,
      paymentMethod: 1, // Cash by default
      addressId: null,  // optional
      receiveType: 1,   // Delivery default
      description: `Order placed by cashier ${cashierName}`,
    };

    this.orderService.createOrder(orderData).subscribe({
      next: () => {
        alert('Order placed successfully by cashier!');
        this.router.navigate(['/cashier-dashboard']);
      },
      error: (err) => {
        console.error('Failed to place order', err);
        alert('Order failed. Please try again.');
      },
    });
  }
}
