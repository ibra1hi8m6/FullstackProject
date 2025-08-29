import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryMealService } from '../../../../../shared/services/Meals/category-meal.service';

@Component({
  selector: 'app-add-category-meal',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-category-meal.component.html',
  styleUrl: './add-category-meal.component.css',
})
export class AddCategoryMealComponent {
  CategoryMealForm!: FormGroup;
  constructor(
    private categoryMealService: CategoryMealService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }
  createForm() {
    this.CategoryMealForm = this.fb.group({
      nameEnglish: ['', Validators.required],
      nameArabic: ['', Validators.required],
      status: [true, Validators.required],
    });
  }

  onSubmit() {
    if (this.CategoryMealForm.valid) {
      const CategoryMeal = this.CategoryMealForm.value;
      this.categoryMealService.AddCategoryMeal(CategoryMeal).subscribe({
        next: () => {
          alert('Category Meal added successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to add Category Meal');
        },
      });
    }
  }
}
