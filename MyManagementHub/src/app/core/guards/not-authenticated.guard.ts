import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const isNotAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isConnected()) {
    return authService.verifyConnection().pipe(
      map(isConnected => {
        return isConnected ? router.parseUrl('/home') : true;
      })
    );
  }

  return router.parseUrl('/home');
};
