import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

import jwt_decode, { JwtPayload } from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private router = inject(Router);

  // constructor() { }

  saveToken(token: string) {
    // localStorage.setItem('token', token);
    setCookie('tokenFrello', token, { expires: 365, path:'/'});
  }

  getToken() {
    // const token = localStorage.getItem('token');
    const token = getCookie('tokenFrello');
    return token;
  }

  // checkToken() {
  //   // const token = localStorage.getItem('token');
  //   const token = getCookie('tokenFrello');
  //   // const token = this.getToken();
  //   console.log('checking if token');
  //   if (!token) {
  //     this.router.navigate(['/login']);
  //     return false
  //   }
  //   return true;
  // }

  checkToken() {
    const isValidToken = this.isValidToken();
    console.log('checking if token ===> ', isValidToken);
    if (!isValidToken) {
      this.router.navigate(['/login']);
      return false
    }
    return true;
  }

  // checkTokenRedirect() {
  //   // const token = localStorage.getItem('token');
  //   const token = getCookie('tokenFrello');
  //   // const token = this.getToken();
  //   console.log('checking if token to Redirect');
  //   if (token) {
  //     this.router.navigate(['/app']);
  //   }
  // }

  checkTokenRedirect() {
    const isValidToken = this.isValidToken();
    console.log('checking if token to Redirect');
    if (isValidToken) {
      this.router.navigate(['/app']);
    }
  }

  removeToken() {
    // localStorage.removeItem('token');
    removeCookie('tokenFrello');
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode<JwtPayload>(token);
    if (decodedToken && decodedToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodedToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
