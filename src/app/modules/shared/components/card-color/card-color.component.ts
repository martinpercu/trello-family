import { Component, Input } from '@angular/core';

import { Allcolors, ALLCOLORS } from '@models/colors.model';


@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html'
})
export class CardColorComponent {

  @Input() color: Allcolors = 'sky';

  mapColor = ALLCOLORS;

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
