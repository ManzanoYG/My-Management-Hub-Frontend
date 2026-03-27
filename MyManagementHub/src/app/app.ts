import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './layout/header/header.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Header],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MyManagementHub');

  constructor(private auth: AuthService) {
    this.auth.checkAuth();
  }
}
