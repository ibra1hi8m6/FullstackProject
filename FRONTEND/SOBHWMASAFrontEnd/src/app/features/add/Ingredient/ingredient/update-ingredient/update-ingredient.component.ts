import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientService } from '../../../../../shared/services/Ingredients/ingredient.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { createIngredientForm } from '../../../../../shared/forms/add-forms/ingredient-forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryIngredientService } from '../../../../../shared/services/Ingredients/category-ingredient.service';
@Component({
  selector: 'app-update-ingredient',
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './update-ingredient.component.html',
  styleUrl: './update-ingredient.component.css'
})
export class UpdateIngredientComponent implements OnInit {

  ingredientForm!: FormGroup;
  allIngredients: any[] = [];
  categoryIngredients: any[] = [];
  selectedIngredient: any = null;

  constructor(
    private fb: FormBuilder,
    private ingredientService: IngredientService,
    private categoryIngredientService: CategoryIngredientService
  ) {

  }
  ngOnInit(): void {
    this.loadAllIngredients();
    this.loadCategoryIngredients();
    this.initForm();
  }
  initForm() {
    this.ingredientForm = this.fb.group({
      ingredientId: ['', Validators.required],
      nameEnglish: ['', Validators.required],
      nameArabic: ['', Validators.required],
      status: [true, Validators.required],  // Set default status as true or false
      categoryIngredientId: ['', Validators.required]
    });
  }
  loadCategoryIngredients() {
    this.categoryIngredientService.getCategoryIngredients().subscribe((data) => {
      this.categoryIngredients = data;
    });
  }
  loadAllIngredients() {
    this.ingredientService.getIngredients().subscribe(data => {
      this.allIngredients = data;
    });
  }
  onIngredientSelect() {
    const ingredientId = this.ingredientForm.value.ingredientId;
    this.selectedIngredient = this.allIngredients.find(item => item.categoryIngredientId === ingredientId);
    if (this.selectedIngredient) {
      this.ingredientForm.patchValue({
        nameEnglish: this.selectedIngredient.nameEnglish,
        nameArabic: this.selectedIngredient.nameArabic,
        status: this.selectedIngredient.status,
        categoryIngredientId: this.selectedIngredient.categoryIngredientId
      });
    }
  }
  updateIngredient() {
    console.log('Update ingredient method triggered!');
    if (this.selectedIngredient) {
      const payload = {
        nameEnglish: this.ingredientForm.value.nameEnglish.trim() || this.selectedIngredient.nameEnglish,
        nameArabic: this.ingredientForm.value.nameArabic.trim() || this.selectedIngredient.nameArabic,
        status: this.ingredientForm.value.status,
        categoryIngredientId: this.ingredientForm.value.categoryIngredientId
      };

      // Send the updated data to the backend
      this.ingredientService.updateIngredientbyID(this.selectedIngredient.categoryIngredientId, payload)
        .subscribe({
          next: () => {
            alert('Ingredient updated successfully!');
            this.loadAllIngredients();
          },
          error: err => {
            console.error('Error updating ingredient:', err);
            alert('Failed to update ingredient');
          }
        });
    }
  }
}
