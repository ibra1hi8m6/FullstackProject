import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../shared/services/Auths/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.role !== 'Admin') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
