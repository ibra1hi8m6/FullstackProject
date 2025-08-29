import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginModel } from '../../../shared/services/Auths/auth.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginModel = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.model).subscribe({
      next: res => {
        alert('Logged in successfully!');
        this.router.navigate(['/']); // redirect to home
      },
      error: err => {
        this.errorMessage = err.error || 'Login failed';
      }
    });
  }
}
