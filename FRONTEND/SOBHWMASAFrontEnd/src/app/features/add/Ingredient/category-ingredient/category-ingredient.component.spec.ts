import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryIngredientComponent } from './category-ingredient.component';

describe('CategoryIngredientComponent', () => {
  let component: CategoryIngredientComponent;
  let fixture: ComponentFixture<CategoryIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryIngredientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
