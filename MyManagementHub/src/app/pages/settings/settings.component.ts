import { Component, inject, signal } from '@angular/core';
import { ThemeService, Theme } from '../../core/services/theme.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { JwtRoleService } from '../../core/auth/jwt-role.service';

type SettingsTab = 'profile' | 'security' | 'preferences' | 'notification' | 'account';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class Settings {
  private _jwtRoleService = inject(JwtRoleService);
  private username = signal<string | null>(null);
  themes: Theme[] = [];
  actualTheme: Theme;
  selectedTheme: Theme;
  securityForm: FormGroup;
  errorChangePassword = '';


  constructor(private themeService: ThemeService, private _fb: FormBuilder, private _userService: UserService) {
    this.themes = this.themeService.getThemes();
    this.actualTheme = this.themeService.getCurrentTheme();
    this.selectedTheme = this.actualTheme;
    this.securityForm = this._fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordVerify: ['', [Validators.required]]
    });
    this._jwtRoleService.getUsername().subscribe(username => {
        this.username.set(username);
    });
  }

  activeTab = signal<SettingsTab>('profile');

  setActiveTab(tab: SettingsTab) {
    this.activeTab.set(tab);
  }

  isTab(tab: SettingsTab) {
    return this.activeTab() === tab;
  }

  changeTheme(theme: Theme, event?: Event) {
    event?.preventDefault();
    this.themeService.setTheme(theme);
  }
  
  validatePreferences() {
    this.selectedTheme = (document.getElementById('theme') as HTMLSelectElement).value as Theme;
    this.changeTheme(this.selectedTheme);
  }

  validateSecurity(value: any) {
    if(value.newPassword !== value.newPasswordVerify) {
      this.errorChangePassword = "New password and confirmation do not match.";
      return;
    }
    this.errorChangePassword = '';
    this._userService.changePassword({
      username: this.username()!,
      oldPassword: value.oldPassword,
      newPassword: value.newPassword
    }).subscribe({
      next: (response) => {
        this.securityForm.reset();
        this.errorChangePassword = "Password changed successfully.";
        if(!response.passwordChanged) {
          this.errorChangePassword = "Failed to change password.";
        }
        
      },
      error: (err) => {
        this.errorChangePassword = err.error.message || "An error occurred while changing the password.";
      }
    });
  }
}
