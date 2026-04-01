import { Component, inject, signal } from '@angular/core';
import { JwtRoleService } from '../../../core/auth/jwt-role.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Button } from "../../../shared/ui/button/button.component";
import { Modal } from '../../../shared/ui/modal/modal.component';

@Component({
  selector: 'app-security',
  imports: [FormsModule, ReactiveFormsModule, Button, Modal],
  templateUrl: './security.component.html',
  styleUrl: '../settings.component.css',
})
export class Security {
  private _jwtRoleService = inject(JwtRoleService);
  private _userService = inject(UserService);
  private username = signal<string | null>(null);
  
  securityForm: FormGroup;
  errorChangePassword = '';

  constructor(private _fb: FormBuilder) {
    this.securityForm = this._fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordVerify: ['', [Validators.required]]
    });
    this._jwtRoleService.getUsername().subscribe(username => {
        this.username.set(username);
    });
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

  confirmPasswordUpdate() {
    if (this.securityForm.invalid) {
      this.errorChangePassword = 'Please complete all password fields.';
      this.securityForm.markAllAsTouched();
      return;
    }

    this.validateSecurity(this.securityForm.value);
  }
}
