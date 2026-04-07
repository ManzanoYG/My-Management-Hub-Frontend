import { Component, inject } from '@angular/core';
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
  private _userService = inject(UserService);
  
  securityForm: FormGroup;
  errorChangePassword = '';

  constructor(private _fb: FormBuilder) {
    this.securityForm = this._fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordVerify: ['', [Validators.required]]
    });
  }

  validateSecurity(value: any) {
    if(value.newPassword !== value.newPasswordVerify) {
      this.errorChangePassword = "New password and confirmation do not match.";
      return;
    }
    this.errorChangePassword = '';
    this._userService.changePassword({
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
