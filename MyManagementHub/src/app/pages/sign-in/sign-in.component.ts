import { Component, signal } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DtoInputLogin } from './dto/dto-input-login';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignIn {
  fieldTextType: boolean = false;
  errorPassword = signal(false);
  login: DtoInputLogin;
  form: FormGroup;

  constructor(private _authService: AuthService, private _fb: FormBuilder, private _router: Router) {
    this.form = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.login = { username: '', password: '' };
  }

  verifyLogin(value: any) {
    this.login.username = value.username;
    this.login.password = value.password;
    this._authService.login(this.login).subscribe({
      next: (response) => {
        this.errorPassword.set(false);
        this._router.navigate(['']);
      },
      error: (err) => {
        this.errorPassword.set(true);
      }
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
