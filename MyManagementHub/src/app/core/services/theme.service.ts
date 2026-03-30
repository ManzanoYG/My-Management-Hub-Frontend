import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService  {
  private storageKey = 'app-theme';
  private isBrowser: boolean;
  private logoPath = 'assets/images/myManagementHubLogo.webp';
  
  private themes: Record<Theme, string> = {
    light: 'light-theme',
    dark: '',
  };

  private logoPaths: Record<Theme, string> = {
    light: 'assets/images/myManagementHubLogo_alt.webp',
    dark: 'assets/images/myManagementHubLogo.webp'
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
      this.setTheme('dark');
    }
  }

  getCurrentTheme(): Theme {
    if (!this.isBrowser) return 'dark';

    return (localStorage.getItem(this.storageKey) as Theme) || 'dark';
  }

  getThemes(): Theme[] {
    return Object.keys(this.themes) as Theme[];
  }

  getLogoPath(): string {
    const theme = this.getCurrentTheme();
    return this.logoPaths[theme];
  }
}