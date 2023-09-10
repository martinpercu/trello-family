import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from '@services/token.service';
import { AuthService } from '@services/auth.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
};

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService : TokenService,
    private authService : AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKEN)) {
      const aValidToken = this.tokenService.isValidToken(); // the access token
      if (aValidToken) {
        return this.addToken(request, next);
      } else {
        return this.updateAccessAndRefreshToken(request, next);
      }
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const accesToken = this.tokenService.getToken();
    if (accesToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accesToken}`)
      });
      return next.handle(authRequest);
    }return next.handle(request);
  }

  private updateAccessAndRefreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const refreshToken = this.tokenService.getRefreshToken();
    const aValidRefreshToken = this.tokenService.isValidRefreshToken();
    if (refreshToken && aValidRefreshToken) {
      return this.authService.refreshToken(refreshToken) // this will save new access and refresh tokens
      .pipe(
        switchMap(() => this.addToken(request, next)),
      )
    }
    return next.handle(request);
  }
}
