import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/Authentication/Auth/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-user-lookup',
  standalone: true, // make sure this is standalone
  imports: [FormsModule,NgIf], // <-- add FormsModule here
  templateUrl: './user-lookup.component.html',
  styleUrl: './user-lookup.component.css'
})
export class UserLookupComponent {
 phoneNumber: string = '';
  user: any = null;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  lookupUser() {
    if (!this.phoneNumber) return;

    this.authService.getUserByPhone(this.phoneNumber).subscribe({
      next: (res) => {
        if (!res) {
          this.toastr.warning('User not found!');
          return;
        }
        this.user = res;
        localStorage.setItem('selectedUserId', res.userId); // save for cart usage
        this.toastr.success(`User ${res.firstName} ${res.lastName} selected`);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to fetch user');
      }
    });
  }
}
