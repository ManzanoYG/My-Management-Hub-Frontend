import { Component } from '@angular/core';
import { Button } from "../../../shared/ui/button/button.component";

@Component({
  selector: 'app-profile',
  imports: [Button],
  templateUrl: './profile.component.html',
  styleUrl: '../settings.component.css',
})
export class Profile {
  timezones = Intl.supportedValuesOf('timeZone');
  filteredTimezones: string[] = [];
  actualTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
}
