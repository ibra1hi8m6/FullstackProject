import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MealService } from '../../../shared/services/Meals/meal.service';
import { SizeService } from '../../../shared/services/Sizes/size.service';
import { Cart, CartItem, CartService } from '../../../shared/services/Cart/cart.service';
import { CategoryMealService } from '../../../shared/services/Meals/category-meal.service';
import { AuthService } from '../../../shared/services/Auths/auth.service';

@Component({
  selector: 'app-single-meal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-meal.component.html',
  styleUrls: ['./single-meal.component.css']
})
export class SingleMealComponent implements OnInit {
  meal: any;
  selectedSizeId: number | null = null;
  quantity: number = 1;
  sizes: any[] = [];
categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService,
    private sizeService: SizeService,
    private categoryService: CategoryMealService,
    private cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const mealId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMeal(mealId);
    this.loadCategories();

  }

  loadMeal(id: number) {
    this.mealService.GetMealByID(id).subscribe(res => {
      console.log(res.mealSizes);
      this.meal = res;
      this.sizes = res.mealSizes;
    });
  }
getCategoryName(meal: any): string {
  const category = this.categories.find(cat => cat.categoryMealId === meal.categoryMealId);
  return category ? `${category.nameEnglish} (${category.nameArabic})` : 'Unknown';
}
loadCategories() {
  this.categoryService.GetAllCategoriesMeals().subscribe(res => {
    this.categories = res;
  });
}
 addToCart() {
  if (!this.authService.isAuthenticated()) {
    alert('You must be logged in to add items to your cart.');
    this.router.navigate(['/login']);
    return;
  }

  if (!this.selectedSizeId) {
    alert('Please select a size.');
    return;
  }

  // Prepare the new cart item DTO
  const newItem: CartItem = {
    mealId: this.meal.mealId,
    sizeId: this.selectedSizeId,
    quantity: this.quantity,
    status: true
  };

  const cartDto: Cart = {
    status: true,
    cartItems: [newItem]
  };

  // Just call the service — it attaches the token
  this.cartService.createCart(cartDto).subscribe({
    next: (res) => {
      alert('Meal added to cart!');
      const userChoice = window.confirm(
        'Do you want to continue shopping? Click OK to continue or Cancel to go to the cart.'
      );
      if (!userChoice) {
        this.router.navigate(['/cart']); // don’t pass userId, backend knows it
      }
    },
    error: (err) => {
      console.error('Failed to add item to cart', err);
      alert('Failed to add meal to cart. Please try again.');
    }
  });
}

}
