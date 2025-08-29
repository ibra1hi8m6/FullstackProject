import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryIngredientComponent } from './add-category-ingredient.component';

describe('AddCategoryIngredientComponent', () => {
  let component: AddCategoryIngredientComponent;
  let fixture: ComponentFixture<AddCategoryIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategoryIngredientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
