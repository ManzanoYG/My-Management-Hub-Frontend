import { Component, signal } from '@angular/core';
import { ThemeService, Theme } from '../../core/services/theme.service';

type SettingsTab = 'profile' | 'security' | 'preferences' | 'notification' | 'account';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class Settings {
  themes: Theme[] = [];
  actualTheme: Theme;
  selectedTheme: Theme;

  constructor(private themeService: ThemeService) {
    this.themes = this.themeService.getThemes();
    this.actualTheme = this.themeService.getCurrentTheme();
    this.selectedTheme = this.actualTheme;
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
}
