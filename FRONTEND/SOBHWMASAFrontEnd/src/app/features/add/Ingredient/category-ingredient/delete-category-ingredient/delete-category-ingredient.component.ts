import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryIngredientService } from '../../../../../shared/services/Ingredients/category-ingredient.service';

@Component({
  selector: 'app-delete-category-ingredient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-category-ingredient.component.html',
  styleUrl: './delete-category-ingredient.component.css'
})
export class DeleteCategoryIngredientComponent implements OnInit {
  categoryIngredients: any[] = [];
  selectedId: number | null = null;

  constructor(private categoryIngredientService: CategoryIngredientService) {}

  ngOnInit() {
    this.getIngredients();
  }

  getIngredients() {
    this.categoryIngredientService.getCategoryIngredients().subscribe({
      next: (data) => {
        this.categoryIngredients = data;
      },
      error: (err) => {
        console.error('Error loading ingredients', err);
      }
    });
  }

  deleteIngredient() {
    if (!this.selectedId) return;

    this.categoryIngredientService.deleteCategoryIngredientbyID(this.selectedId).subscribe({
      next: () => {
        alert('Ingredient deleted successfully');
        this.getIngredients(); // refresh list
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Delete failed');
      }
    });
  }
}
