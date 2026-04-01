import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class Button {
  @Input() label = 'Action';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() position: 'start' | 'center' | 'end' | '' = 'center';
  @Input() icon: string | null = null;
  @Input() large = false;
  @Input() dataBsToggle: string | null = null;
  @Input() dataBsTarget: string | null = null;

  @Output() pressed = new EventEmitter<void>();

  onPress(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }
    this.pressed.emit();
  }
}
