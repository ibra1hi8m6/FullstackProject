import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, Cart, CartItem } from '../../../shared/services/Cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../../../shared/services/Meals/meal.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cart: Cart | null = null;// status = true means active
  newItem: CartItem = { mealId: 0,sizeId: 0, quantity: 1, status: true }; // status = true means active
  private userId: string = '';
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private mealService: MealService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      if (this.userId) {
        this.loadCart();
      }
    });
  }

  loadCart() {
    this.cartService.getCartsByUser(this.userId).subscribe(carts => {
      // Find the active cart (assuming one active cart per user)
      this.cart = carts.find(c => c.status === true) || null;
      if (this.cart && this.cart.cartItems.length > 0) {
        // Here you would load meal details for each item in the cart if needed
        // For simplicity, we are just using the mealId from the cart item
      }
    });
  }

  // New method to remove a single item
  removeItem(cartItemId: number) {
    if (this.cart && this.cart.cartId !== undefined) {
      this.cartService.deleteItemFromCart(this.cart.cartId, cartItemId).subscribe({
        next: () => {
          alert('Item removed from cart!');
          this.loadCart(); // Reload the cart to reflect the changes
        },
        error: (err) => {
          console.error('Failed to remove item', err);
          alert('Failed to remove item. Please try again.');
        }
      });
    }
  }

  // New method to clear the entire cart
  clearCart() {
      // A more robust implementation would loop through all items and call removeItem for each
      // Or you can create a dedicated backend endpoint to clear the entire cart.
      // For now, let's just make sure the user wants to proceed
      if (window.confirm('Are you sure you want to clear the entire cart?')) {
          this.cartService.createCart({
              
              status: true,
              cartItems: [] // Send an empty cart to effectively clear it
          }).subscribe({
              next: () => {
                  alert('Cart cleared!');
                  this.loadCart();
              },
              error: (err) => {
                  console.error('Failed to clear cart', err);
                  alert('Failed to clear cart. Please try again.');
              }
          });
      }
  }
}
