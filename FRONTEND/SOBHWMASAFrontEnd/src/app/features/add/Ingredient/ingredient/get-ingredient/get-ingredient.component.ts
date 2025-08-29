import { Component , OnInit} from '@angular/core';
import { IngredientService } from '../../../../../shared/services/Ingredients/ingredient.service'; // Adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-ingredient',
  imports: [CommonModule],
  templateUrl: './get-ingredient.component.html',
  styleUrl: './get-ingredient.component.css'
})
export class GetIngredientComponent implements OnInit {
  ingredients: any[] = [];

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients() {
    this.ingredientService.getIngredients().subscribe({
      next: (data) => {
        this.ingredients = data;
        console.log(this.ingredients); // Store the fetched ingredients in a component property
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load ingredients');
      }
    });
  }
}
