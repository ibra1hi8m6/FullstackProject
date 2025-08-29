import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySizeComponent } from './category-size.component';

describe('CategorySizeComponent', () => {
  let component: CategorySizeComponent;
  let fixture: ComponentFixture<CategorySizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
