import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategoryIngredientComponent } from './get-category-ingredient.component';

describe('GetCategoryIngredientComponent', () => {
  let component: GetCategoryIngredientComponent;
  let fixture: ComponentFixture<GetCategoryIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCategoryIngredientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCategoryIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
