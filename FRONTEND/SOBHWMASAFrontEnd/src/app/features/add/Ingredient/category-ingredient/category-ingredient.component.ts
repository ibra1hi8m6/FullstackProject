import { Component } from '@angular/core';
import { CategoryIngredientService } from '../../../../shared/services/Ingredients/category-ingredient.service';
import { RouterModule } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { createCategoryIngredientGroup } from '../../../../shared/forms/add-forms/categoryingredient-forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-ingredient',
  standalone: true,
  imports: [ CommonModule,
    FormsModule ,
    ReactiveFormsModule, RouterModule ],
  templateUrl: './category-ingredient.component.html',
  styleUrl: './category-ingredient.component.css'
})
export class CategoryIngredientComponent {

}
