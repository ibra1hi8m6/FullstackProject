import { Component } from '@angular/core';
import { CategoryIngredientService } from '../../../../../shared/services/Ingredients/category-ingredient.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-get-category-ingredient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-category-ingredient.component.html',
  styleUrl: './get-category-ingredient.component.css'
})
export class GetCategoryIngredientComponent {
  categoryIngredients: any[] = [];

  constructor(private categoryIngredientService: CategoryIngredientService) { }

  ngOnInit(): void {
    this.loadCategoryIngredients();
  }

  loadCategoryIngredients() {
    this.categoryIngredientService.getCategoryIngredients().subscribe(
      (data) => {
        this.categoryIngredients = data; // Assign the API response to the categoryIngredients array
        console.log(this.categoryIngredients); // Check the response in the console
      },
      (error) => {
        console.error('Error fetching category ingredients', error); // Handle any errors
      }
    );
  }
}
