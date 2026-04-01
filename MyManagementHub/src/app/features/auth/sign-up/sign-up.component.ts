import { Component, signal } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DtoInputSignUp } from '../../../core/models/auth/dto-input-signup';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UserService } from '../../../core/services/user.service';
import { Button } from "../../../shared/ui/button/button.component";

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive, Button],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUp {
  passwordFieldTextType: boolean = false;
  passwordFieldTextTypeVerify: boolean = false;
  errorPassword = signal(false);
  signupData: DtoInputSignUp;
  form: FormGroup;

  constructor(private _userService: UserService, private _fb: FormBuilder, private _router: Router) {
    this.form = this._fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordVerify: ['', [Validators.required]]
    });
    this.signupData = { userName: '', password: ''};
  }

  signup(value: any) {
    if (value.password === value.passwordVerify) {
      this.errorPassword.set(false);
      this.signupData.userName = value.userName;
      this.signupData.password = value.password;
      console.log(this.signupData);
      this._userService.signup(this.signupData).subscribe({
        next: (response) => {
          //this._router.navigate(['login']);
          this.errorPassword.set(false);
        },
        error: (err) => {
          console.log(err);
          this.errorPassword.set(true);
        }
      });
    } else {
      this.errorPassword.set(true);
    }
  }

  togglePasswordFieldTextType() {
    this.passwordFieldTextType = !this.passwordFieldTextType;
  }

  togglePasswordFieldTextTypeVerify() {
    this.passwordFieldTextTypeVerify = !this.passwordFieldTextTypeVerify;
  }
}
