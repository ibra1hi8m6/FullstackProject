import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategoryMealComponent } from './get-category-meal.component';

describe('GetCategoryMealComponent', () => {
  let component: GetCategoryMealComponent;
  let fixture: ComponentFixture<GetCategoryMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCategoryMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCategoryMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
