import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MealService } from '../../../shared/services/Meals/meal.service';
import { SizeService } from '../../../shared/services/Sizes/size.service';
import { Cart, CartItem, CartService } from '../../../shared/services/Cart/cart.service';
import { CategoryMealService } from '../../../shared/services/Meals/category-meal.service';
import { AuthService } from '../../../shared/services/Authentication/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
private userId: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService,
    private sizeService: SizeService,
    private categoryService: CategoryMealService,
    private cartService: CartService,
    public authService: AuthService,
    private toastr: ToastrService
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
    if (!this.authService.isLoggedIn()) {
      this.toastr.warning('You must be logged in to add items to your cart.', 'Warning', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        progressBar: true,
      });
      this.router.navigate(['/ser/signin']);
      return;
    }

    if (!this.selectedSizeId) {
      this.toastr.warning('Please select a size.', 'Warning', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        progressBar: true,
      });
      return;
    }

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

    const claims = this.authService.getClaims();
  const role = claims ? claims['role'] : null;

  const targetUserId = role === 'Cashier'
    ? localStorage.getItem('selectedUserId') || ''
    : claims?.['UserID'] || '';

  if (!targetUserId) return;

  this.cartService.createCart(cartDto, targetUserId).subscribe({
  next: () => {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'success',
      title: 'Meal added to cart!',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'info',
      title: 'Click here to view your cart.',
      showConfirmButton: true,
      confirmButtonText: 'View Cart',
      customClass: {
        confirmButton: 'my-confirm-btn'
      },
      buttonsStyling: false
    }).then(() => this.router.navigate(['/cart', targetUserId]));
    },
  error: () => {
    Swal.fire('Error', 'Failed to add meal to cart. Please try again.', 'error');
  }
});

  }

}
