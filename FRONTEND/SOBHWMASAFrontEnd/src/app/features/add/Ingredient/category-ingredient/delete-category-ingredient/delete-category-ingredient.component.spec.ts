import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategoryIngredientComponent } from './delete-category-ingredient.component';

describe('DeleteCategoryIngredientComponent', () => {
  let component: DeleteCategoryIngredientComponent;
  let fixture: ComponentFixture<DeleteCategoryIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCategoryIngredientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCategoryIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
