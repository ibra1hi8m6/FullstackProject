import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategorySizeComponent } from './update-category-size.component';

describe('UpdateCategorySizeComponent', () => {
  let component: UpdateCategorySizeComponent;
  let fixture: ComponentFixture<UpdateCategorySizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCategorySizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategorySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
