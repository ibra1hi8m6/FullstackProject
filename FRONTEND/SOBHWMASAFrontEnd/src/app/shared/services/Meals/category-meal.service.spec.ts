import { TestBed } from '@angular/core/testing';

import { CategoryMealService } from './category-meal.service';

describe('CategroyMealService', () => {
  let service: CategoryMealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryMealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
