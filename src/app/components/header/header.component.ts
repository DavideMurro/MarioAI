import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppHeader } from 'src/app/models/app-header.model';
import { Language } from 'src/app/models/language.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() chatForm!: FormGroup;
  @Input() appHeaderForm!: FormGroup;
  @Input() appHeader!: AppHeader;
  @Output() appHeaderFormSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Output() chatFormSubmit: EventEmitter<void> = new EventEmitter<void>();
}
