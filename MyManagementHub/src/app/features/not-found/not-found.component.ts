import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from "../../shared/ui/button/button.component";

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, RouterLinkActive, Button],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFound {
    navigate() {
        window.history.pushState({}, '', '/home');
    }
}
