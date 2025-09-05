import { Component, OnInit } from '@angular/core';
 // assuming you have this
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../shared/services/Orders/order.service';
import { AuthService } from '../../../../shared/services/Authentication/Auth/auth.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];
  userId: string | null = null;
  loading = true;
statusMap: { [key: number]: string } = {
  1: 'Pending',
  2: 'Cooking',
  3: 'Out for Delivery',
  4: 'Completed',
  5: 'Cancelled'
};

paymentMap: { [key: number]: string } = {
  1: 'Cash',
  2: 'Card'
};

receiveMap: { [key: number]: string } = {
  1: 'Delivery',
  2: 'From Branch'
};
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const claims = this.authService.getClaims();
    this.userId = claims ? claims.UserID : null;

    if (this.userId) {
      this.orderService.getOrdersByUser(this.userId).subscribe({
        next: (res: any) => {
          this.orders = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load orders:', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}
