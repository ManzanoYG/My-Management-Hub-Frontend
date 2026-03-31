import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class Button {
  @Input() label = 'Action';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;

  @Output() pressed = new EventEmitter<void>();

  onPress(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }
    this.pressed.emit();
  }
}
