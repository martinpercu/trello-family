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
      'bg-orange-700': this.color === 'orange',
      'gb-orange-800': this.color === 'orange',
      'ring-orange-300': this.color === 'orange',
      'bg-pink-700': this.color === 'pink',
      'gb-pink-800': this.color === 'pink',
      'ring-pink-300': this.color === 'pink',
      'bg-sky-700': this.color === 'sky',
      'gb-sky-800': this.color === 'sky',
      'ring-sky-300': this.color === 'sky',
      'bg-lime-700': this.color === 'lime',
      'gb-lime-800': this.color === 'lime',
      'ring-lime-300': this.color === 'lime',
      'bg-fuchsia-700': this.color === 'fuchsia',
      'gb-fuchsia-800': this.color === 'fuchsia',
      'ring-fuchsia-300': this.color === 'fuchsia',
      'bg-teal-700': this.color === 'teal',
      'gb-teal-800': this.color === 'teal',
      'ring-teal-300': this.color === 'teal',
    }
  }

}
