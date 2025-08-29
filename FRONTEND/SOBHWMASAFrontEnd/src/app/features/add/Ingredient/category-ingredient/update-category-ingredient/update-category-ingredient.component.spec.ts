import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryIngredientComponent } from './update-category-ingredient.component';

describe('UpdateCategoryIngredientComponent', () => {
  let component: UpdateCategoryIngredientComponent;
  let fixture: ComponentFixture<UpdateCategoryIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCategoryIngredientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategoryIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
