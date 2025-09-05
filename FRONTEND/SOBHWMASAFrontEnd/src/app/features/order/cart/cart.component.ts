import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, Cart, CartItem } from '../../../shared/services/Cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../../../shared/services/Meals/meal.service';
import { SizeService } from '../../../shared/services/Sizes/size.service';
import { forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../../../shared/services/Authentication/Auth/auth.service';
// New interfaces to match the data structure from the backend
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

// Interface to combine cart item data with meal and size details
export interface DetailedCartItem {
  cartItemId: number;
  mealId: number;
  quantity: number;
  mealDetails: MealDTO;
  sizeDetails: SizeDTO;
  subtotal: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  detailedCartItems: DetailedCartItem[] = [];
  totalPrice = 0;
  private userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private mealService: MealService,
    private sizeService: SizeService,
    private authService: AuthService,
    private router: Router, private toastr: ToastrService
  ) {}

  ngOnInit(): void {
      // 1. Try to get userId from route parameter
  this.userId = this.route.snapshot.paramMap.get('userId') || '';

  // 2. If route param is empty, fallback to token / localStorage
  if (!this.userId) {
    const claims = this.authService.getClaims();
    const role = claims ? claims['role'] : null;

    if (role === 'Cashier') {
      // Cashier selected user stored in localStorage
      this.userId = localStorage.getItem('selectedUserId') || '';
    } else {
      // Normal logged-in user
      this.userId = claims ? claims['UserID'] : '';
    }
  }

  // 3. Load cart if we have a userId
  if (this.userId) this.loadCart();
  }

  loadCart() {
     const claims = this.authService.getClaims();
  const role = claims ? claims['role'] : null;

  // Determine which userId to use
  const userId = role === 'Cashier'
    ? localStorage.getItem('selectedUserId') || ''
    : claims?.['UserID'] || '';

  if (!userId) return;

  this.cartService.getActiveCartByUser(userId).subscribe({
    next: (activeCart) => {
      this.cart = { ...activeCart, cartItems: activeCart.cartItems || [] };
      this.fetchDetailedCartItems();
    },
    error: (err) => {
      console.error('Failed to load active cart:', err);
      this.cart = null;
      this.detailedCartItems = [];
    }
  });
  }

  fetchDetailedCartItems() {
    if (!this.cart || this.cart.cartItems.length === 0) {
      this.detailedCartItems = [];
      this.calculateTotal();
      return;
    }

    const itemRequests = this.cart.cartItems.map(item =>
      forkJoin({
        meal: this.mealService.GetMealByID(item.mealId),
        size: this.sizeService.GetSizeById(item.sizeId)
      }).pipe(
        map(({ meal, size }) => {
          // Find the price for the specific size selected
          const mealSize = meal.mealSizes.find((ms: any) => ms.sizeId === item.sizeId);
          const price = mealSize ? mealSize.price : 0;
          const subtotal = price * item.quantity;

          return {
            ...item,
            mealDetails: meal,
            sizeDetails: size,
            subtotal: subtotal
          } as DetailedCartItem;
        }),
        catchError(error => {
          console.error(`Error fetching details for meal ${item.mealId}:`, error);
          return of(null); // Return a fallback observable
        })
      )
    );

    forkJoin(itemRequests).subscribe(results => {
      this.detailedCartItems = results.filter(result => result !== null) as DetailedCartItem[];
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.detailedCartItems.reduce((sum, item) => sum + item.subtotal, 0);
  }

  updateQuantity(item: DetailedCartItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      this.removeItem(item.cartItemId!);
      return;
    }

    const updatedCartDto: Cart = {
      cartId: this.cart?.cartId,
      status: true,
      cartItems: [{
        cartItemId: item.cartItemId,
        mealId: item.mealId,
        sizeId: item.sizeDetails.sizeId,
        quantity: change,
        status: true
      }]
    };

    this.cartService.createCart(updatedCartDto).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err) => {
        console.error('Failed to update item quantity', err);
        alert('Failed to update quantity. Please try again.');
      }
    });
  }

 removeItem(cartItemId: number) {
  if (this.cart && this.cart.cartId !== undefined) {
    this.cartService.deleteItemFromCart(this.cart.cartId, cartItemId).subscribe({
      next: () => {
        this.toastr.success('Item removed from cart successfully!', 'Success', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          progressBar: true,
        });
        this.loadCart(); // refresh cart
      },
      error: (err) => {
        console.error('Failed to remove item', err);
        this.toastr.error('Failed to remove item. Please try again.', 'Error', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          progressBar: true,
        });
      }
    });
  }
}
goToCheckout() {
  this.router.navigate(['/user-order/order-checkout']);
}

clearCart() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Your cart will be cleared!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, clear it!',
    cancelButtonText: 'Cancel',
    customClass: {
      confirmButton: 'my-confirm-btn',
      cancelButton: 'my-cancel-btn'
    },
    buttonsStyling: false // lets us fully control CSS
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartService.clearCart(this.cart!.cartId!).subscribe({
        next: () => {
          Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
          this.cart = null;
          this.detailedCartItems = [];
          this.totalPrice = 0;
        },
        error: () => {
          Swal.fire('Error', 'Failed to clear cart. Please try again.', 'error');
        }
      });
    }
  });
}

  // A new function to help Angular track items in the loop efficiently
  trackByCartItemId(index: number, item: DetailedCartItem): number | undefined {
    return item.cartItemId;
  }
}
