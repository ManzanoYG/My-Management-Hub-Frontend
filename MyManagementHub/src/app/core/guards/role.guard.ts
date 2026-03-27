import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { JwtRoleService } from '../auth/jwt-role.service';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const jwtRoleService = inject(JwtRoleService);

  const allowedRoles = route.data?.['allowedRoles'] as readonly number[] | undefined;

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  return jwtRoleService.getRole().pipe(
    map(userRole => {
      if (userRole === null || !allowedRoles.includes(userRole)) {
        return router.parseUrl('/');
      }
      return true;
    })
  );
};