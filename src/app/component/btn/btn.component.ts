import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html'
})
export class BtnComponent {

  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'button';
  @Input() color = 'red'

  get colors() {
    return {
      'bg-success-700': this.color === 'success',
      'gb-success-800': this.color === 'success',
      'ring-success-300': this.color === 'success',
      'bg-primary-700': this.color === 'primary',
      'gb-primary-800': this.color === 'primary',
      'ring-primary-300': this.color === 'primary',
      'bg-red-700': this.color === 'red',
      'gb-red-800': this.color === 'red',
      'ring-red-300': this.color === 'red',
    }
  }

}
