import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMealComponent } from './single-meal.component';

describe('SingleMealComponent', () => {
  let component: SingleMealComponent;
  let fixture: ComponentFixture<SingleMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
