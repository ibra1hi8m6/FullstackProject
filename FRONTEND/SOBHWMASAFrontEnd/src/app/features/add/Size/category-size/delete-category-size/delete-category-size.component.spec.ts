import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategorySizeComponent } from './delete-category-size.component';

describe('DeleteCategorySizeComponent', () => {
  let component: DeleteCategorySizeComponent;
  let fixture: ComponentFixture<DeleteCategorySizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCategorySizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCategorySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
