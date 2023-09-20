import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html'
})
export class CardColorComponent {

  @Input() color: 'sky' | 'green' | 'violet' | 'gray' | 'yellow' = 'sky';

  mapColor = {
    sky: {
      'bg-sky-600': true,
      'hover:bg-sky-800': true,
      'text-white': true
    },
    green: {
      'bg-green-600': true,
      'hover:bg-green-800': true,
      'text-white': true
    },
    violet: {
      'bg-violet-600': true,
      'hover:bg-violet-800': true,
      'text-white': true
    },
    gray: {
      'bg-gray-600': true,
      'hover:bg-gray-800': true,
      'text-white': true
    },
    yellow: {
      'bg-yellow-600': true,
      'hover:bg-yellow-800': true,
      'text-white': true
    },
  }

  // get colors() {
  //   const classes = this.mapColor[this.color];
  //   if (classes) {
  //     return classes
  //   }
  //   return {};
  // }

  // UNDER is better code. Above is the same. Both methods are the same.

  get colors() {
    const classes = this.mapColor[this.color];
    return classes ? classes : {};
  }

}
