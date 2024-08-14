import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const role = localStorage.getItem('role');
  if (isLoggedIn === 'true' && role === 'admin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};