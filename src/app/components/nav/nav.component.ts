import { Component } from '@angular/core';
import { faBell, faInfoCircle, faClose } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;

  isOpen = false;

}
