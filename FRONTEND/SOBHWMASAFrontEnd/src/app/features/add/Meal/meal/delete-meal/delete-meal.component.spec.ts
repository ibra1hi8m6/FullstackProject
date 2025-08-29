import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMealComponent } from './delete-meal.component';

describe('DeleteMealComponent', () => {
  let component: DeleteMealComponent;
  let fixture: ComponentFixture<DeleteMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
