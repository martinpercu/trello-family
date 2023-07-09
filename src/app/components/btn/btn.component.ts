import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html'
})
export class BtnComponent {

  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'button';
  @Input() color: 'success' | 'primary' | 'danger' | 'light' | 'teal' | 'lime' = 'primary'

  mapColors = {
    success: {
      'bg-success-700': true,
      'hover:bg-success-800': true,
      'ring-success-300': true,
      'text-gray-800': true
    },
    primary: {
      'bg-primary-600': true,
      'hover:bg-primary-700': true,
      'ring-primary-200': true,
      'text-gray-800': true
    },
    danger: {
      'bg-red-700': true,
      'hover:bg-red-800': true,
      'ring-red-300': true,
      'text-white': true
    },
    light: {
      'bg-gray-300': true,
      'hover:bg-gray-500': true,
      'ring-gray-100': true,
      'text-gray-800': true
    },
    teal: {
      'bg-teal-700': true,
      'hover:bg-teal-800': true,
      'ring-teal-300': true,
      'text-white': true
    },
    lime: {
      'bg-lime-700': true,
      'hover:bg-lime-800': true,
      'ring-lime-300': true,
      'text-white': true
    }
  }

  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors
    }
    return {};

    // return {
    //   'text-white': this.color === 'succes' || this.color === 'primary' || this.color === 'red',
    //   'text-gray-700': this.color === 'gray-light' || this.color === 'lime',
    //   'bg-success-700': this.color === 'success',
    //   'hover:bg-success-800': this.color === 'success',
    //   'ring-success-300': this.color === 'success',
    //   'bg-primary-700': this.color === 'primary',
    //   'hover:bg-primary-800': this.color === 'primary',
    //   'ring-primary-300': this.color === 'primary',
    //   'bg-red-700': this.color === 'red',
    //   'hover:bg-red-800': this.color === 'red',
    //   'ring-red-300': this.color === 'red',
    //   'bg-orange-700': this.color === 'orange',
    //   'hover:bg-orange-800': this.color === 'orange',
    //   'ring-orange-300': this.color === 'orange',
    //   'bg-pink-700': this.color === 'pink',
    //   'hover:bg-pink-800': this.color === 'pink',
    //   'ring-pink-300': this.color === 'pink',
    //   'bg-sky-700': this.color === 'sky',
    //   'hover:bg-sky-800': this.color === 'sky',
    //   'ring-sky-300': this.color === 'sky',
    //   'bg-lime-500': this.color === 'lime',
    //   'hover:bg-lime-600': this.color === 'lime',
    //   'ring-lime-100': this.color === 'lime',
    //   'bg-fuchsia-700': this.color === 'fuchsia',
    //   'hover:bg-fuchsia-800': this.color === 'fuchsia',
    //   'ring-fuchsia-300': this.color === 'fuchsia',
    //   'bg-teal-700': this.color === 'teal',
    //   'hover:bg-teal-800': this.color === 'teal',
    //   'ring-teal-300': this.color === 'teal',
    //   'bg-gray-100': this.color === 'gray-light',
    //   'hover:bg-gray-400': this.color === 'gray-light',
    //   'ring-gray-300': this.color === 'gray-light',
    // }
  }

}
