import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '@environments/environment'

import { User } from '@models/user.model';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';


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

  getPosition(cards: Card[], currentIndex: number) {
    console.log(cards, currentIndex);
    if (cards.length === 1) { // this means card is empty
      return 'Is New Card'
    }
    if (cards.length > 1 && currentIndex === 0) { // this means card is in the top
      return 'In the TOP'
    }
    const lastIndex = cards.length - 1;
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) { // this means card is in the midddle
      return 'Somewhere in the middle'
    }
    if (cards.length > 1 && currentIndex === lastIndex) { // this means card is the last one bottom one.
      return 'In the BOTTOM'
    }
    return 'other';
  }
}
