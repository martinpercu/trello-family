import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie';


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

  checkToken() {
    // const token = localStorage.getItem('token');
    const token = getCookie('tokenFrello');
    // const token = this.getToken();
    console.log('checking if token');
    if (!token) {
      this.router.navigate(['/login']);
      return false
    }
    return true;
  }

  checkTokenRedirect() {
    // const token = localStorage.getItem('token');
    const token = getCookie('tokenFrello');
    // const token = this.getToken();
    console.log('checking if token to Redirect');
    if (token) {
      this.router.navigate(['/app']);
    }
  }

  removeToken() {
    // localStorage.removeItem('token');
    removeCookie('tokenFrello');
  }
}
