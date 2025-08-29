import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

import { CategorySizeService } from '../../../../../shared/services/Sizes/category-size.service';
import { SizeService } from '../../../../../shared/services/Sizes/size.service';
import { CategoryIngredientService } from '../../../../../shared/services/Ingredients/category-ingredient.service';
import { IngredientService } from '../../../../../shared/services/Ingredients/ingredient.service';
import { CategoryMealService } from '../../../../../shared/services/Meals/category-meal.service';
import { MealService } from '../../../../../shared/services/Meals/meal.service';

@Component({
  selector: 'app-add-meal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-meal.component.html',
  styleUrl: './add-meal.component.css',
})
export class AddMealComponent implements OnInit {
  MealsForm!: FormGroup;

  // Data for main meal form dropdowns
  categoryMeals: any[] = [];

  // Data for ingredient section dropdowns
  categoryIngredients: any[] = [];
  filteredIngredients: any[] = [];
  selectedCategoryIngredientId: number | null = null;
  selectedIngredientToAdd: number | null = null;

  // Data for size section dropdowns
  categorySizes: any[] = [];
  filteredSizes: any[] = [];
  selectedCategorySizeId: number | null = null;
  selectedSizeToAdd: number | null = null;
  priceForSelectedSize: number | null = null;

  selectedImage: File | null = null;
  selectedImageBase64: string | null = null; // Stores the Base64 string of the selected image

  constructor(
    private sizeService: SizeService,
    private ingredientService: IngredientService,
    private categorySizeService: CategorySizeService, // Corrected injection type
    private categoryIngredientService: CategoryIngredientService,
    private categoryMealService: CategoryMealService,
    private mealService: MealService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm(); // Initialize the main form structure
    this.loadInitialData(); // Load all necessary data for dropdowns
  }

  // ---- Form Initialization ----
  createForm() {
    this.MealsForm = this.fb.group({
      nameEnglish: ['', Validators.required],
      nameArabic: ['', Validators.required],
      status: [true, Validators.required],

      categoryMealId: ['', Validators.required],
      mealSizes: this.fb.array([]), // Initialize as an empty FormArray
      mealIngredients: this.fb.array([]), // Initialize as an empty FormArray
    });
  }

  // Getters for easy access to FormArrays in template
  get mealSizes(): FormArray {
    return this.MealsForm.get('mealSizes') as FormArray;
  }

  get mealIngredients(): FormArray {
    return this.MealsForm.get('mealIngredients') as FormArray;
  }

  // ---- Data Loading ----
  loadInitialData(): void {
    this.loadCategoryMeals();
    this.loadAllCategorySizes();
    this.loadAllCategoryIngredients();
  }

  loadCategoryMeals(): void {
    this.categoryMealService.GetAllCategoriesMeals().subscribe({
      next: (data: any[]) => {
        this.categoryMeals = data;
      },
      error: (err) => {
        console.error('Error fetching category meals', err);
        alert('Failed to load meal categories.');
      },
    });
  }

  loadAllCategorySizes(): void {
    this.categorySizeService.GetAllCategorySizes().subscribe({
      next: (data: any[]) => {
        this.categorySizes = data;
      },
      error: (err) => {
        console.error('Error fetching category sizes', err);
        alert('Failed to load size categories.');
      },
    });
  }

  loadAllCategoryIngredients(): void {
    this.categoryIngredientService.getCategoryIngredients().subscribe({
      next: (data: any[]) => {
        this.categoryIngredients = data;
      },
      error: (err) => {
        console.error('Error fetching category ingredients', err);
        alert('Failed to load ingredient categories.');
      },
    });
  }

  // ---- Dynamic Fetching Logic for Ingredients/Sizes (Based on Category Selection) ----
  onCategoryIngredientSelect(): void {
    this.selectedIngredientToAdd = null;
    this.filteredIngredients = [];

    if (this.selectedCategoryIngredientId !== null) {
      this.ingredientService
        .getIngredientsByCategoryID(this.selectedCategoryIngredientId)
        .subscribe({
          next: (data: any[]) => {
            this.filteredIngredients = data;
            console.log(
              `Loaded ${data.length} ingredients for category ${this.selectedCategoryIngredientId}:`,
              data
            );
          },
          error: (err) => {
            console.error(
              `Error fetching ingredients by category ${this.selectedCategoryIngredientId}`,
              err
            );
            alert('Failed to load ingredients for selected category.');
            this.filteredIngredients = [];
          },
        });
    }
  }

  onCategorySizeSelect(): void {
    this.selectedSizeToAdd = null;
    this.priceForSelectedSize = null;
    this.filteredSizes = [];

    if (this.selectedCategorySizeId !== null) {
      this.sizeService
        .GetSizesByCategoryId(this.selectedCategorySizeId)
        .subscribe({
          next: (data: any[]) => {
            this.filteredSizes = data;
            console.log(
              `Sizes for category ${this.selectedCategorySizeId}:`,
              data
            );
          },
          error: (err) => {
            console.error(
              `Error fetching sizes by category ${this.selectedCategorySizeId}`,
              err
            );
            alert('Failed to load sizes for selected category.');
            this.filteredSizes = [];
          },
        });
    }
  }

  // ---- Dynamic List (FormArray) Management ----

  // Create a FormGroup for a single MealIngredient entry
  private createMealIngredientFormGroup(ingredientId: number): FormGroup {
    return this.fb.group({
      ingredientId: [ingredientId, Validators.required],
    });
  }

  // Add an ingredient to the mealIngredients FormArray
  addMealIngredient(): void {
    if (this.selectedIngredientToAdd === null) {
      alert('Please select an ingredient to add.');
      return;
    }

    // Prevent adding duplicates
    const exists = this.mealIngredients.controls.some(
      (control) =>
        control.get('ingredientId')?.value === this.selectedIngredientToAdd
    );
    if (exists) {
      alert('This ingredient has already been added to the meal.');
      return;
    }

    this.mealIngredients.push(
      this.createMealIngredientFormGroup(this.selectedIngredientToAdd)
    );
    this.selectedIngredientToAdd = null; // Reset for next selection
  }

  removeMealIngredient(index: number): void {
    this.mealIngredients.removeAt(index);
  }

  private createMealSizeFormGroup(sizeId: number, price: number): FormGroup {
    return this.fb.group({
      sizeId: [sizeId, Validators.required],
      price: [price, [Validators.required, Validators.min(0)]],
    });
  }

  addMealSize(): void {
    if (
      this.selectedSizeToAdd === null ||
      this.priceForSelectedSize === null ||
      this.priceForSelectedSize < 0
    ) {
      alert('Please select a size and enter a valid price to add.');
      return;
    }

    // Prevent adding duplicates
    const exists = this.mealSizes.controls.some(
      (control) => control.get('sizeId')?.value === this.selectedSizeToAdd
    );
    if (exists) {
      alert('This size has already been added to the meal.');
      return;
    }

    this.mealSizes.push(
      this.createMealSizeFormGroup(
        this.selectedSizeToAdd,
        this.priceForSelectedSize
      )
    );
    this.selectedSizeToAdd = null; // Reset for next selection
    this.priceForSelectedSize = null; // Reset price
  }

  removeMealSize(index: number): void {
    this.mealSizes.removeAt(index);
  }

  // Improved getIngredientName to handle partial data
  getIngredientName(ingredientId: number): string {
    const ingredient = this.filteredIngredients.find(
      (i: any) => i.ingredientId === ingredientId
    );

    if (ingredient) {
      // Prioritize English and Arabic if available, otherwise just English
      return `${ingredient.nameEnglish || ''}${
        ingredient.nameArabic ? ' (' + ingredient.nameArabic + ')' : ''
      }`.trim();
    }
    return 'Unknown Ingredient';
  }

  // Improved getSizeName to handle partial data and include unit
  getSizeName(sizeId: number): string {
    const size = this.filteredSizes.find((s: any) => s.sizeId === sizeId);

    if (size) {
      let sizeName = `${size.nameEnglish || ''}`;
      if (size.nameArabic) {
        sizeName += ` (${size.nameArabic})`;
      }
      // Assuming your API returns a 'unit' property for sizes
      if (size.unit) {
        sizeName += ` - ${size.unit}`;
      }
      return sizeName.trim();
    }
    return 'Unknown Size';
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageBase64 = reader.result as string; // Store Base64 string
        // Optionally, update imageUrl form control with file name or a placeholder
        this.MealsForm.patchValue({
          imageUrl: this.selectedImage ? this.selectedImage.name : '',
        });
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        this.selectedImageBase64 = null;
        alert('Could not read image file. Please try again.');
      };
      reader.readAsDataURL(this.selectedImage); // Read file as Data URL (Base64)
    } else {
      this.selectedImageBase64 = null;
      this.MealsForm.patchValue({ imageUrl: '' });
    }
  }

  resetForm(): void {
    // Reset the main form
    this.MealsForm.reset({
      status: true, // Keep status as true by default
    });

    // Clear the FormArrays
    while (this.mealSizes.length !== 0) {
      this.mealSizes.removeAt(0);
    }
    while (this.mealIngredients.length !== 0) {
      this.mealIngredients.removeAt(0);
    }

    // Reset file input and selected image
    this.selectedImage = null;
    this.selectedImageBase64 = null; // Reset Base64 string
    const fileInput = document.getElementById('mealImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clear the file input visually
    }

    // Reset dropdown selections
    this.selectedCategoryIngredientId = null;
    this.selectedIngredientToAdd = null;
    this.filteredIngredients = [];
    this.selectedCategorySizeId = null;
    this.selectedSizeToAdd = null;
    this.priceForSelectedSize = null;
    this.filteredSizes = [];
  }

  // ---- Form Submission ----
  onSubmit(): void {
    // Mark all controls as touched to display validation messages
    if (this.MealsForm.invalid) {
      this.MealsForm.markAllAsTouched();
      alert(
        'Please fill in all required fields and ensure all nested lists are valid.'
      );
      return;
    }

    // Custom validation for minimum items in FormArrays
    if (this.mealSizes.length === 0) {
      alert('Please add at least one meal size.');
      return;
    }
    if (this.mealIngredients.length === 0) {
      alert('Please add at least one meal ingredient.');
      return;
    }
    // Custom validation for image presence (Base64 string)
    if (!this.selectedImageBase64) {
      alert('Please select an image for the meal.');
      return;
    }

    // Get all form data as a plain JavaScript object
    const mealData = this.MealsForm.value;

    // Construct the payload to send as JSON
    const payload = {
      nameEnglish: mealData.nameEnglish,
      nameArabic: mealData.nameArabic,
      status: mealData.status,
      categoryMealId: mealData.categoryMealId,
      imageFileBase64: this.selectedImageBase64, // Send the Base64 string of the image
      mealSizes: mealData.mealSizes, // These are now directly objects, HttpClient will stringify them
      mealIngredients: mealData.mealIngredients, // These are now directly objects, HttpClient will stringify them
    };

    // Call the MealService to add the meal with the JSON payload
    this.mealService.AddMeal(payload).subscribe({
      next: (res) => {
        alert('Meal added successfully!');
        this.resetForm(); // Reset form on success
      },
      error: (err) => {
        console.error('Error adding meal:', err);
        // Enhanced error message parsing for validation errors from backend
        if (err.status === 400 && err.error && err.error.errors) {
          let errorMessage = 'Validation Errors:\n';
          for (const key in err.error.errors) {
            if (err.error.errors.hasOwnProperty(key)) {
              const messages = err.error.errors[key];
              if (Array.isArray(messages)) {
                errorMessage += `${key}: ${messages.join(', ')}\n`;
              } else {
                errorMessage += `${key}: ${messages}\n`; // Fallback for non-array messages
              }
            }
          }
          alert(errorMessage);
        } else if (
          err.error &&
          typeof err.error === 'string' &&
          err.status !== 200
        ) {
          alert('Failed to add meal: ' + err.error);
        } else {
          alert('Failed to add meal. Please try again.');
        }
      },
    });
  }
}
