import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategoryMealComponent } from './delete-category-meal.component';

describe('DeleteCategoryMealComponent', () => {
  let component: DeleteCategoryMealComponent;
  let fixture: ComponentFixture<DeleteCategoryMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCategoryMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCategoryMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
