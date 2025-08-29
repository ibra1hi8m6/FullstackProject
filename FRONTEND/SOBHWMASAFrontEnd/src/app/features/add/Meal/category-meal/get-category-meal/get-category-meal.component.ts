import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryMealService } from '../../../../../shared/services/Meals/category-meal.service';

@Component({
  selector: 'app-get-category-meal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-category-meal.component.html',
  styleUrl: './get-category-meal.component.css',
})
export class GetCategoryMealComponent {
  categoryMeals: any[] = [];
  constructor(private categoryMealService: CategoryMealService) {}

  ngOnInit(): void {
    this.loadCategoryMeals();
  }

  loadCategoryMeals() {
    this.categoryMealService.GetAllCategoriesMeals().subscribe(
      (data) => {
        this.categoryMeals = data;
        console.log(this.categoryMeals);
      },
      (error) => {
        console.error('Error fetching category size', error);
      }
    );
  }
}
