import { Component, inject } from '@angular/core';
import { faBell, faInfoCircle, faClose, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

// import { User } from '@models/user.model';

import { TokenService } from '@services/token.service';

import { BoardsService } from '@services/boards.service';
import { Allcolors, NAVBAR_BACKGROUNDS } from '@models/colors.model';




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
  isOpenOverlayCreateBoards = false;

  // user : User | null = null;
  user$ = this.authService.user$;
  navBarBackgroundColor: Allcolors = 'sky';
  navBarColors = NAVBAR_BACKGROUNDS;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private boardsService: BoardsService
  ) {
    this.boardsService.backgroundColor$.subscribe(color => {
      this.navBarBackgroundColor = color;
    });
  }

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

  closeBoardForm() {
    this.isOpenOverlayCreateBoards = false
  }
  closeBoardForm2(event: boolean) { // here we expect a false
    this.isOpenOverlayCreateBoards = event; // this event we send to html
  }

  get colors() {
    const classes = this.navBarColors[this.navBarBackgroundColor];
    return classes ? classes : {} ;
  }

}
