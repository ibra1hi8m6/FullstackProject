import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MealService } from '../../../../../shared/services/Meals/meal.service';
@Component({
  selector: 'app-get-meal',
    standalone: true,
      imports: [CommonModule],
  templateUrl: './get-meal.component.html',
  styleUrl: './get-meal.component.css'
})
export class GetMealComponent {

  meals: any[] = [];

 constructor(

    private mealService: MealService,

  ) { }
ngOnInit(): void {
    this.getAllMeals(); // Call the method to fetch meals on component initialization
  }

  getAllMeals(): void {
    this.mealService.GetAllMeals().subscribe({
      next: (data: any[]) => {
        this.meals = data;
        console.log('Fetched Meals:', this.meals);
        // You can inspect the data here to see the ImageFileBase64
      },
      error: (err) => {
        console.error('Error fetching meals:', err);
        alert('Failed to load meals.');
      }
    });
  }

}
