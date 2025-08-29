import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategorySizeService } from '../../../../../shared/services/Sizes/category-size.service';

@Component({
  selector: 'app-add-category-size',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-category-size.component.html',
  styleUrl: './add-category-size.component.css',
})
export class AddCategorySizeComponent {
  CategorySizeForm!: FormGroup;
  constructor(
    private categorySizeService: CategorySizeService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.CategorySizeForm = this.fb.group({
      nameEnglish: ['', Validators.required],
      nameArabic: ['', Validators.required],
      status: [true, Validators.required],
    });
  }
  onSubmit() {
    if (this.CategorySizeForm.valid) {
      const CategorySize = this.CategorySizeForm.value;
      this.categorySizeService.AddCategorySize(CategorySize).subscribe({
        next: () => {
          alert('Category Size added successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to add Category Size');
        },
      });
    }
  }
}
