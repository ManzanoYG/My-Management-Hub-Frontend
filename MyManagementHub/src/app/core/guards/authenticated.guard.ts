import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isConnected()) {
    return true;
  }

  return authService.verifyConnection().pipe(
    map(isConnected => {
      return isConnected ? true : router.parseUrl('/sign-in');
    })
  );
};
