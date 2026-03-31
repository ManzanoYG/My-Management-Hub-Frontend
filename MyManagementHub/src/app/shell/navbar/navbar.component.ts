import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { JwtRoleService } from '../../core/auth/jwt-role.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavBar {
  private _authService = inject(AuthService);
  private _jwtRoleService = inject(JwtRoleService);
  private _cdr = inject(ChangeDetectorRef);
  private _themeService = inject(ThemeService);

  isConnected = this._authService.isConnected;
  username = signal<string | null>(null);
  logoPath = this._themeService.getLogoPath();

  constructor() {
    effect(() => {
      if (this.isConnected()) {
        this._jwtRoleService.getUsername().subscribe(username => {
          this.username.set(username);
          this._cdr.markForCheck();
        });
      }
    });
  }

  logout() {
    this._authService.logout().subscribe();
    window.location.reload();
  }
}
