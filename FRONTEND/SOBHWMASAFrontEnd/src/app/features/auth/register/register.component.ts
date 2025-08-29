import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, RegisterModel, UserRole } from '../../../shared/services/Auths/auth.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 model: RegisterModel = {
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    role: UserRole.User,
    address: {
      description: '',
      areaName: '',
      streetName: '',
      buildingNumber: '',
      floorNumber: '',
      flatNumber: ''
    }
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
     console.log('Registering with data:', this.model); 
    this.authService.register(this.model).subscribe({

      next: res => {
        alert('Registered successfully!');
        this.router.navigate(['/login']); // redirect to login
      },
      error: err => {
        this.errorMessage = err.error || 'Registration failed';
      }
    });
  }
}
