import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryMealComponent } from './add-category-meal.component';

describe('AddCategoryMealComponent', () => {
  let component: AddCategoryMealComponent;
  let fixture: ComponentFixture<AddCategoryMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategoryMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
