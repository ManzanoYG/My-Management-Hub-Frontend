import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './layout/header/header.component';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Header],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('MyManagementHub');

  constructor(private auth: AuthService, private themeService: ThemeService) {
    this.auth.checkAuth();
  }

  ngOnInit() {
    this.themeService.loadTheme();
  }
}
