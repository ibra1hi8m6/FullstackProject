import { Component } from '@angular/core';
import { createCategoryIngredientGroup } from '../../../../../shared/forms/add-forms/categoryingredient-forms'
import { FormBuilder, FormGroup, FormsModule,FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryIngredientService } from '../../../../../shared/services/Ingredients/category-ingredient.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { saveCategoryIngredientAsync } from './add-category-ingredient.helper';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-add-category-ingredient',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,
    ],
  templateUrl: './add-category-ingredient.component.html',
  styleUrl: './add-category-ingredient.component.css'
})
export class AddCategoryIngredientComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryIngredientService: CategoryIngredientService
  ) {
    this.categoryForm = this.fb.group({
    
      nameEnglish: ['', Validators.required],
      nameArabic: ['', Validators.required],
      status: [null]
    });

  }
  async onSubmit() {
    if (this.categoryForm.invalid) return;
    const categoryIngredient = this.categoryForm.value;
    console.log('Form data:', categoryIngredient);
    await saveCategoryIngredientAsync(categoryIngredient, this.categoryIngredientService);
  }

}
