import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSizeComponent } from './get-size.component';

describe('GetSizeComponent', () => {
  let component: GetSizeComponent;
  let fixture: ComponentFixture<GetSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
