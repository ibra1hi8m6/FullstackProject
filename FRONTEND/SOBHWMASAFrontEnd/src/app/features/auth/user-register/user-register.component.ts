import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, RegisterModel, UserRole } from '../../../shared/services/Auths/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
   standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
       roleOptions = Object.keys(UserRole)
    .filter(key => isNaN(Number(key))) // Filter out numeric keys
    .map(key => ({
      name: key,
      value: UserRole[key as keyof typeof UserRole]
    }));
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
    this.model.role = this.model.role;
    this.authService.register(this.model).subscribe({
      next: res => {
        alert('User created successfully!');
        this.router.navigate(['/']); // go to dashboard or home
      },
      error: err => {
        this.errorMessage = err.error || 'Registration failed';
      }
    });
  }
}
