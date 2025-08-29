import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryMealComponent } from './update-category-meal.component';

describe('UpdateCategoryMealComponent', () => {
  let component: UpdateCategoryMealComponent;
  let fixture: ComponentFixture<UpdateCategoryMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCategoryMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategoryMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
