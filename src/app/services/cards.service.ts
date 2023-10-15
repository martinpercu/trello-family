import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@models/user.model';
import { Board } from '@models/board.model';
import { Card, CreateCardDto, UpdatedCardDto } from '@models/card.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  create(dto: CreateCardDto) {
    return this.http.post<Card>(`${this.apiUrl}/api/v1/cards`, dto, {
      context: checkToken()
    });
  }

  update(id: Card['id'], changes: UpdatedCardDto) {
    return this.http.put<Card>(`${this.apiUrl}/api/v1/cards/${id}`, changes, {
      context: checkToken()
    });
  }

}
