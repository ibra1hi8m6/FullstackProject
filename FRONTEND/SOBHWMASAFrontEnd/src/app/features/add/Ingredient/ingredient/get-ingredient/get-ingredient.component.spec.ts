import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetIngredientComponent } from './get-ingredient.component';

describe('GetIngredientComponent', () => {
  let component: GetIngredientComponent;
  let fixture: ComponentFixture<GetIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetIngredientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
