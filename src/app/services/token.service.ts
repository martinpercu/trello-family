import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private router = inject(Router);

  constructor() { }

  saveToken(token: string) {
    // localStorage.setItem('token', token);
    setCookie('token-frello', token, { expires: 365});
  }

  getToken() {
    // const token = localStorage.getItem('token');
    const token = getCookie('token-frello');
    return token;
  }

  checkToken() {
    // const token = localStorage.getItem('token');
    // const token = getCookie('token-frello');
    const token = this.getToken();
    console.log('checking if token');

    if(!token) {
      this.router.navigate(['/login']);
      return false
    }
    return true;
  }

  removeToken() {
    // localStorage.removeItem('token');
    removeCookie('token-frello');
  }
}
