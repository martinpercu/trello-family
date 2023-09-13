import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '@environments/environment'

import { User } from '@models/user.model';
import { Board } from '@models/board.model';

import { checkToken } from '@interceptors/token.interceptor';



@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  apiUrl = environment.API_URL;

  private http = inject(HttpClient);

  getBoard(id: Board['id'])  {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken()
    });
  }
}
