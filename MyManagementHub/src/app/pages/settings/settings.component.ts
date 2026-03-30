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

  constructor(private themeService: ThemeService) {
    this.themes = this.themeService.getThemes();
  }

  activeTab = signal<SettingsTab>('profile');

  setActiveTab(tab: SettingsTab) {
    this.activeTab.set(tab);
  }

  isTab(tab: SettingsTab) {
    return this.activeTab() === tab;
  }

  changeTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
