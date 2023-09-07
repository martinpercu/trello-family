import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '@environments/environment'

// import { TokenService } from '@services/token.service';

import { User } from '@models/user.model';

import { checkToken } from '@interceptors/token.interceptor';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.API_URL;

  private http = inject(HttpClient);
  // private tokenService = inject(TokenService);

  constructor() { }


  getUsers()  {
    // const token = this.tokenService.getToken();
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, {
      // headers: {
      //   authorization: `Bearer ${token}`
      // }
      context: checkToken()
    });
  }
}
