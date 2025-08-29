import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategorySizeComponent } from './get-category-size.component';

describe('GetCategorySizeComponent', () => {
  let component: GetCategorySizeComponent;
  let fixture: ComponentFixture<GetCategorySizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCategorySizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCategorySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
