import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private router = inject(Router);

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  checkToken() {
    const token = localStorage.getItem('token');
    if(!token) {
      this.router.navigate(['/login']);
      return false
    }
    return true;
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
