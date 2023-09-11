import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '@services/token.service';
@Injectable({
  providedIn: 'root'
})
export class RedirectGuard {

  private tokenService = inject(TokenService);
  private router = inject(Router);

  canActivate(): boolean {
    const token = this.tokenService.getToken();
    if (token) {
      this.router.navigate(['/app']);
    }
    return true;
  }

}
