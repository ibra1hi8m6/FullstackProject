import { Component, OnInit } from '@angular/core';
import { CategoryIngredientService } from '../../../../../shared/services/Ingredients/category-ingredient.service';
import { IngredientService } from '../../../../../shared/services/Ingredients/ingredient.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-ingredient',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add-ingredient.component.html',
  styleUrl: './add-ingredient.component.css'
})
export class AddIngredientComponent implements OnInit {
  categoryIngredients: any[] = [];
  ingredientForm!: FormGroup;

  constructor(private ingredientService: IngredientService,private categoryIngredientService: CategoryIngredientService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCategoryIngredients();
    this.createForm();
  }

  loadCategoryIngredients() {
    this.categoryIngredientService.getCategoryIngredients().subscribe((data) => {
      this.categoryIngredients = data;
    });
  }

  createForm() {
    this.ingredientForm = this.fb.group({
      nameEnglish: ['', Validators.required],
      nameArabic: ['', Validators.required],
      status: [true, Validators.required],
      categoryIngredientId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.ingredientForm.valid) {
      const ingredient = this.ingredientForm.value;
      this.ingredientService.addIngredient(ingredient).subscribe({
        next: () => {
          alert('Ingredient added successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to add ingredient');
        }
      });
    }
  }
}
