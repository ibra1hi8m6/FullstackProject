import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategorySizeComponent } from './add-category-size.component';

describe('AddCategorySizeComponent', () => {
  let component: AddCategorySizeComponent;
  let fixture: ComponentFixture<AddCategorySizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategorySizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategorySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
