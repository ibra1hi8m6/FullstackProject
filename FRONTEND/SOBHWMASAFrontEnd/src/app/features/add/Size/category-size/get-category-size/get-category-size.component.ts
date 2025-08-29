import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategorySizeService } from '../../../../../shared/services/Sizes/category-size.service';

@Component({
  selector: 'app-get-category-size',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-category-size.component.html',
  styleUrl: './get-category-size.component.css',
})
export class GetCategorySizeComponent {
  categorySizes: any[] = [];

  constructor(private categorySizeService: CategorySizeService) {}

  ngOnInit(): void {
    this.loadCategorySizes();
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
}
