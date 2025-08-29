import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../../../shared/services/Ingredients/ingredient.service';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createIngredientForm } from '../../../../shared/forms/add-forms/ingredient-forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [RouterModule,CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent  {

}
