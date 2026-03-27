import { Component, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from "@angular/router";

import { AppRegistryService } from '../../core/apps/app-registry.service';
import { JwtRoleService } from '../../core/auth/jwt-role.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayout {
  private readonly appRegistryService = inject(AppRegistryService);
  private readonly jwtRoleService = inject(JwtRoleService);
  private readonly _authService = inject(AuthService);
  
  isConnected = this._authService.isConnected;

  readonly apps = toSignal(
  this.jwtRoleService.getRole().pipe(
    map(role =>
      this.appRegistryService.getAccessibleApps(role)
    )
  ),
  { initialValue: [] }
);
}
