import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMealComponent } from './get-meal.component';

describe('GetMealComponent', () => {
  let component: GetMealComponent;
  let fixture: ComponentFixture<GetMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
