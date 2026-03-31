import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';
import { NavBar } from './shell/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, NavBar],
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
