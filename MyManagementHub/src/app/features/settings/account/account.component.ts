import { Component, inject, signal } from '@angular/core';
import { Button } from "../../../shared/ui/button/button.component";
import { UserService } from '../../../core/services/user.service';
import { JwtRoleService } from '../../../core/auth/jwt-role.service';
import { AuthService } from '../../../core/services/auth.service';
import { Modal } from "../../../shared/ui/modal/modal.component";

@Component({
  selector: 'app-account',
  imports: [Button, Modal],
  templateUrl: './account.component.html',
  styleUrl: '../settings.component.css',
})
export class Account {
  private _userService = inject(UserService);
  private _authService = inject(AuthService);
  bodyDeleteAccount = "Are you sure you want to delete your account? This action is irreversible and all your data will be permanently lost.";
  errorDeleteAccount = '';

  deleteAccount(): void {
    this._userService.deleteUser().subscribe({
      next: (response) => {
        if(response.deleted) {
          this._authService.logout().subscribe();
          window.location.reload();
        } else {
          this.errorDeleteAccount = "Failed to delete user.";
        }
      },
      error: (error) => {
        this.errorDeleteAccount = "An error occurred while deleting the account.";
      }
    });
  }
}