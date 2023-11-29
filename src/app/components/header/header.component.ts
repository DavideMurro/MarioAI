import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() chatForm!: FormGroup;
  @Input() languageForm!: FormGroup;
  @Input() languages!: String[];
  @Output() languageFormSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Output() chatFormSubmit: EventEmitter<void> = new EventEmitter<void>();
}
