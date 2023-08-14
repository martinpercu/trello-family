import { Component, inject } from '@angular/core';
import { faBell, faInfoCircle, faClose, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

// import { User } from '@models/user.model';

import { TokenService } from '@services/token.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent
// implements OnInit
{

  // private authService = inject(AuthService);
  // private router = inject(Router);

  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  // user : User | null = null;
  user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  // ngOnInit() {
  //   this.authService.getProfile()
  //   .subscribe(user => {
  //     this.user = user;
  //   })
  // }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getIfIsValidToken() {
    console.log(this.tokenService.isValidToken());

  }

}
