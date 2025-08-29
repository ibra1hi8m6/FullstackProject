import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SizeService } from '../../../../../shared/services/Sizes/size.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategorySizeService } from '../../../../../shared/services/Sizes/category-size.service';

@Component({
  selector: 'app-add-size',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-size.component.html',
  styleUrl: './add-size.component.css',
})
export class AddSizeComponent {
  SizesForm!: FormGroup;
  categorySizes: any[] = [];
  constructor(
    private sizeService: SizeService,
    private fb: FormBuilder,
    private categorySizeService: CategorySizeService
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    this.loadCategorySizes();
  }
  createForm() {
    this.SizesForm = this.fb.group({
      nameEnglish: ['', Validators.required],
      nameArabic: ['', Validators.required],
      status: [true, Validators.required],
      categorySizeId: [Validators.required],
    });
  }

  loadCategorySizes() {
    this.categorySizeService.GetAllCategorySizes().subscribe(
      (data) => {
        this.categorySizes = data;
        console.log(this.categorySizes);
      },
      (error) => {
        console.error('Error fetching category size', error);
      }
    );
  }

  onSubmit() {
    if (this.SizesForm.valid) {
      const ingredient = this.SizesForm.value;
      this.sizeService.AddSize(ingredient).subscribe({
        next: () => {
          alert('Size added successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to add ingredient');
        },
      });
    }
  }
}
