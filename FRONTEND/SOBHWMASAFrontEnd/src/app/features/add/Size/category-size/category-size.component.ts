import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-size',
  standalone: true,
    imports: [ CommonModule,
      FormsModule ,
      ReactiveFormsModule, RouterModule ],
  templateUrl: './category-size.component.html',
  styleUrl: './category-size.component.css'
})
export class CategorySizeComponent {

}
