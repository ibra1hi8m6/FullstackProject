import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngFor
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]
import { IngredientService } from '../../../../../shared/services/Ingredients/ingredient.service';

@Component({
  selector: 'app-delete-ingredient',
  standalone: true, // Mark as standalone
  imports: [CommonModule, FormsModule], // Add CommonModule and FormsModule
  templateUrl: './delete-ingredient.component.html',
  styleUrl: './delete-ingredient.component.css'
})
export class DeleteIngredientComponent implements OnInit {
  // List to hold all ingredients for the dropdown
  allIngredients: any[] = [];
  // Stores the ID of the currently selected ingredient from the dropdown
  selectedId: number | null = null;

  constructor(
    private ingredientService: IngredientService // Only ingredientService is needed now
  ) {}

  ngOnInit(): void {
    this.loadAllIngredients(); // Load all ingredients when the component initializes
  }

  // Fetches all ingredients from the service to populate the dropdown
  loadAllIngredients() {
    this.ingredientService.getIngredients().subscribe({
      next: (data) => {
        this.allIngredients = data;
      },
      error: (err) => {
        console.error('Error loading ingredients', err);
        // Optionally, display an error message to the user
        alert('Failed to load ingredients.');
      }
    });
  }

  // Handles the deletion of the selected ingredient
  deleteIngredient() {
    // Prevent deletion if no ingredient is selected
    if (this.selectedId === null) {
      alert('Please select an ingredient to delete.');
      return;
    }

    // Call the ingredient service to delete the ingredient by its selected ID
    this.ingredientService.deleteIngredientbyID(this.selectedId).subscribe({
      next: () => {
        alert('Ingredient deleted successfully!');
        this.loadAllIngredients(); // Refresh the list of ingredients after deletion
        this.selectedId = null; // Reset the selected ID in the dropdown
      },
      error: (err) => {
        console.error('Error deleting ingredient:', err);
        alert('Failed to delete ingredient');
      }
    });
  }
}
