import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { JwtRoleService } from '../../core/auth/jwt-role.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class Header {
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
