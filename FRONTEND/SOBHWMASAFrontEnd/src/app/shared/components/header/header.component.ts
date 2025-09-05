import { AfterViewInit, Component, ElementRef } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/Authentication/Auth/auth.service';
import { claimReq } from '../../utils/claimReq-utils';
import { HideIfClaimsNotMetDirective } from '../../directives/hide-if-claims-not-met.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,RouterLink,CommonModule,RouterLinkActive,HideIfClaimsNotMetDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  firstName: string = '';
  role: string = '';
  userId: string | null = null;
claimReq = claimReq

  constructor(private elRef: ElementRef, private router: Router,public authService: AuthService)
  {}
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
      this.userId = payload.UserID || payload.sub || null;
    }
  }
    isAdmin(): boolean {
    return this.role === 'Admin';
  }

logout() {
  this.authService.deleteToken();
  this.router.navigate(['/user/signin']);
  this.updateUserInfo();
}

isUserLoggedIn(): boolean {
    return !!this.authService.getToken();
  }
  navigate(route: string) {
    this.router.navigateByUrl(route);
    document.querySelector('.navbar-collapse')?.classList.remove('show'); // Close menu
  }
}
