import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class Modal {
  @Input() modalId: string = 'modal';
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() icon: string = '';
  @Input() confirmButtonLabel: string = 'Confirm';
  @Input() cancelButtonLabel: string = 'Cancel';
  @Input() confirmButtonClass: string = '';

  @Output() pressed = new EventEmitter<void>();

  onPress(event: MouseEvent): void {
    event.preventDefault();
    this.pressed.emit();
  }
}
