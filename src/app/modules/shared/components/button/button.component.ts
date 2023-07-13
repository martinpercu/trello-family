import { Component, Input, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-btn',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() color: 'success' | 'primary' | 'danger' | 'light' | 'sky' =
    'primary';
  faSpinner = faSpinner;

  mapColors = {
    success: {
      'bg-success-700': true,
      'hover:bg-success-500': true,
      'focus:ring-success-300': true,
      'text-white': true,
    },
    primary: {
      'bg-primary-700': true,
      'hover:bg-primary-800': true,
      'focus:ring-primary-300': true,
      'text-white': true,
    },
    danger: {
      'bg-red-500': true,
      'hover:bg-red-600': true,
      'focus:ring-red-100': true,
      'text-white': true,
    },
    light: {
      'bg-primary-400': true,
      'hover:bg-primary-300': true,
      'focus:ring-primary-50': true,
      'text-white': true,
    },
    sky: {
      'bg-sky-700': true,
      'hover:bg-sky-800': true,
      'focus:ring-sky-300': true,
      'text-white': true,
    },
  };

  constructor() {}

  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }
}
