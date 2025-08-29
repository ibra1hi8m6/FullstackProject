import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryIngredientService } from '../../../../../shared/services/Ingredients/category-ingredient.service';

@Component({
  selector: 'app-update-category-ingredient',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-category-ingredient.component.html',
  styleUrl: './update-category-ingredient.component.css'
})
export class UpdateCategoryIngredientComponent implements OnInit {

  categoryIngredientForm!: FormGroup;
  allCategoryIngredients: any[] = [];
  selectedCategoryIngredient: any = null;

  constructor(
    private fb: FormBuilder,
    private categoryIngredientService: CategoryIngredientService
  ) { }

  ngOnInit(): void {
    this.loadAllCategoryIngredients();
    this.initForm();
  }

  initForm() {
    this.categoryIngredientForm = this.fb.group({
      categoryIngredientId: ['', Validators.required],
      nameEnglish: ['', Validators.required],
      nameArabic: ['', Validators.required],
      status: [true, Validators.required] // Added status control
    });
  }

  loadAllCategoryIngredients() {
    this.categoryIngredientService.getCategoryIngredients().subscribe((data) => {
      this.allCategoryIngredients = data;
    });
  }

  onCategoryIngredientSelect() {
    const categoryIngredientId = this.categoryIngredientForm.value.categoryIngredientId;
    this.selectedCategoryIngredient = this.allCategoryIngredients.find(
      item => item.categoryIngredientId === categoryIngredientId
    );

    if (this.selectedCategoryIngredient) {
      this.categoryIngredientForm.patchValue({
        nameEnglish: this.selectedCategoryIngredient.nameEnglish,
        nameArabic: this.selectedCategoryIngredient.nameArabic,
        status: this.selectedCategoryIngredient.status // Patching status value
      });
    }
  }

  updateCategoryIngredient() {
    console.log('Update category ingredient method triggered!');

    if (this.selectedCategoryIngredient && this.categoryIngredientForm.valid) {
      const payload = {
        nameEnglish: this.categoryIngredientForm.value.nameEnglish.trim() || this.selectedCategoryIngredient.nameEnglish,
        nameArabic: this.categoryIngredientForm.value.nameArabic.trim() || this.selectedCategoryIngredient.nameArabic,
        status: this.categoryIngredientForm.value.status, // Including status in payload
      };

      this.categoryIngredientService.updateCategoryIngredientbyID(this.selectedCategoryIngredient.categoryIngredientId, payload)
        .subscribe({
          next: () => {
            alert('Category Ingredient updated successfully!');
            this.loadAllCategoryIngredients();
            this.categoryIngredientForm.reset();
            this.selectedCategoryIngredient = null;
            this.initForm();
          },
          error: err => {
            console.error('Error updating category ingredient:', err);
            alert('Failed to update category ingredient');
          }
        });
    } else {
      console.warn('Form is invalid or no category ingredient selected.');
      alert('Please select a category ingredient and fill in all required fields.');
    }
  }
}
