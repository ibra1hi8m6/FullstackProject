import { AfterViewInit, Component, ElementRef } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/Auths/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,RouterLink,CommonModule,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
   firstName: string = '';
  role: string = '';


  constructor(private elRef: ElementRef, private router: Router, public authService: AuthService) {}
  ngAfterViewInit() {
    const dropdowns = this.elRef.nativeElement.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach((dropdown: any) => new bootstrap.Dropdown(dropdown));

    this.updateUserInfo();
  }
updateUserInfo() {
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.firstName = payload.firstName || '';
      this.role = payload.role || '';
    }
  }
    isAdmin(): boolean {
    return this.role === 'Admin';
  }

   logout() {
    this.authService.logout().subscribe({
      next: () => {
        // This will now trigger the clearToken method in the service
        this.router.navigate(['/login']);
        this.updateUserInfo(); // This updates the header to show "Sign In" and "Sign Up"
      },
      error: (err) => {
        // Handle error, but still force logout on the frontend
        console.error('Logout failed:', err);
        this.authService.clearToken();
        this.router.navigate(['/login']);
        this.updateUserInfo();
      }
    });
  }

isUserLoggedIn(): boolean {
    return !!this.authService.getToken();
  }
  navigate(route: string) {
    this.router.navigateByUrl(route);
    document.querySelector('.navbar-collapse')?.classList.remove('show'); // Close menu
  }
}
