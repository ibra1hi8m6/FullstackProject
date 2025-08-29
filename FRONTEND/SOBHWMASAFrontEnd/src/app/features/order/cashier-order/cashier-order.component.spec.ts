import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierOrderComponent } from './cashier-order.component';

describe('CashierOrderComponent', () => {
  let component: CashierOrderComponent;
  let fixture: ComponentFixture<CashierOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
