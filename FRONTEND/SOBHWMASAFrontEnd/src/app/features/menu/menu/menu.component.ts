import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryMealService } from '../../../shared/services/Meals/category-meal.service';
import { MealService } from '../../../shared/services/Meals/meal.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categories: any[] = [];
  meals: any[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private categoryService: CategoryMealService,
    private mealService: MealService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadMeals();
  }

  loadCategories() {
    this.categoryService.GetAllCategoriesMeals().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => console.error(err)
    });
  }

  loadMeals() {
    this.mealService.GetAllMeals().subscribe({
      next: (res) => {
        this.meals = res;
      },
      error: (err) => console.error(err)
    });
  }

  filterMeals(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
  }
getCategoryName(meal: any): string {
  const category = this.categories.find(cat => cat.categoryMealId === meal.categoryMealId);
  return category ? `${category.nameEnglish} (${category.nameArabic})` : 'Unknown';
}
  get filteredMeals() {
    if (this.selectedCategoryId === null) return this.meals;
    return this.meals.filter(meal => meal.categoryMealId === this.selectedCategoryId);
  }
}

