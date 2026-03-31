import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-preferences',
  imports: [],
  templateUrl: './preferences.component.html',
  styleUrl: '../settings.component.css',
})
export class Preferences{
  themes: Theme[] = [];
  actualTheme: Theme;
  selectedTheme: Theme;

  constructor(private themeService: ThemeService) {
    this.themes = this.themeService.getThemes();
    this.actualTheme = this.themeService.getCurrentTheme();
    this.selectedTheme = this.actualTheme;
  }

  changeTheme(theme: Theme, event?: Event) {
    event?.preventDefault();
    this.themeService.setTheme(theme);
  }
  
  validatePreferences() {
    this.selectedTheme = (document.getElementById('theme') as HTMLSelectElement).value as Theme;
    this.changeTheme(this.selectedTheme);
  }
}
