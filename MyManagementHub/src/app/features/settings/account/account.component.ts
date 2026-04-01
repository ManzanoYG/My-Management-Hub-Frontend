import { Component } from '@angular/core';
import { Button } from "../../../shared/ui/button/button.component";

@Component({
  selector: 'app-account',
  imports: [Button],
  templateUrl: './account.component.html',
  styleUrl: '../settings.component.css',
})
export class Account {
  test(): void {
    console.log('Button pressed');
  }
}
