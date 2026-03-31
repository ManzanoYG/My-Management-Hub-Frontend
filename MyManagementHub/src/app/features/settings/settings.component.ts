import { Component, signal } from '@angular/core';
import { Account } from "./account/account.component";
import { Notification } from "./notification/notification.component";
import { Profile } from "./profile/profile.component";
import { Preferences } from "./preferences/preferences.component";
import { Security } from "./security/security.component";

type SettingsTab = 'profile' | 'security' | 'preferences' | 'notification' | 'account';

@Component({
  selector: 'app-settings',
  imports: [Account, Notification, Profile, Preferences, Security],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class Settings {
  activeTab = signal<SettingsTab>('profile');

  setActiveTab(tab: SettingsTab) {
    this.activeTab.set(tab);
  }

  isTab(tab: SettingsTab) {
    return this.activeTab() === tab;
  }
}
