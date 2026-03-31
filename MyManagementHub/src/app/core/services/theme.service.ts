import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export type Theme = 'Light' | 'Dark' | 'Retro' | 'Lemonade';

@Injectable({
  providedIn: 'root',
})
export class ThemeService  {
  private storageKey = 'app-theme';
  private isBrowser: boolean;
  
  private themes: Record<Theme, string> = {
    Light: 'light-theme',
    Dark: '',
    Retro: 'retro-theme',
    Lemonade: 'lemonade-theme'
  };

  private logoPaths: Record<Theme, string> = {
    Light: 'assets/images/myManagementHubLogo_alt.webp',
    Dark: 'assets/images/myManagementHubLogo.webp',
    Retro: 'assets/images/myManagementHubLogo_alt.webp',
    Lemonade: 'assets/images/myManagementHubLogo_alt.webp'

  };

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setTheme(theme: Theme) {
    if (!this.isBrowser) return;

    const body = document.body;

    Object.values(this.themes).forEach(className => {
      if (className) {
        body.classList.remove(className);
      }
    });

    const themeClass = this.themes[theme];
    if (themeClass) {
      body.classList.add(themeClass);
    }

    localStorage.setItem(this.storageKey, theme);
  }

  loadTheme() {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem(this.storageKey) as Theme;

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('Dark');
    }
  }

  getCurrentTheme(): Theme {
    if (!this.isBrowser) return 'Dark';

    return (localStorage.getItem(this.storageKey) as Theme) || 'Dark';
  }

  getThemes(): Theme[] {
    return Object.keys(this.themes) as Theme[];
  }

  getLogoPath(): string {
    const theme = this.getCurrentTheme();
    return this.logoPaths[theme];
  }
}