import { TestBed } from '@angular/core/testing';

import { CategoryIngredientService } from './category-ingredient.service';

describe('CategoryIngredientService', () => {
  let service: CategoryIngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryIngredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
