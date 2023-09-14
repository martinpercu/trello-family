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

  bufferSpace = 65535

  private http = inject(HttpClient);

  getBoard(id: Board['id'])  {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken()
    });
  }

  getPosition(cards: Card[], currentIndex: number) {
    console.log(cards, currentIndex);
    if (cards.length === 1) { // this means card is empty
      console.log('Is New Card');
      return this.bufferSpace;
    }
    if (cards.length > 1 && currentIndex === 0) { // this means card is in the top
      console.log('In the TOP');
      const theTopPosition = cards[1].position; // the top position is [1] because the new card is in position [0]... Remember this is just after the card movement.
      return theTopPosition / 2;
    }
    const lastIndex = cards.length - 1;
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) { // this means card is in the midddle
      console.log('Somewhere in the middle');
      const previousCardPosition = cards[currentIndex - 1].position;
      const postCardPosition = cards[currentIndex + 1].position;
      return (previousCardPosition + postCardPosition) / 2;
    }
    if (cards.length > 1 && currentIndex === lastIndex) { // this means card is the last one bottom one.
      console.log('In the BOTTOM');
      const theLastCardPosition = cards[lastIndex - 1].position; // the BOTTOM position is [lastIndex - 1] because the new card NOW is in the last position ==> in position [lastIndex]... Remember this is just after the card movement.
      return theLastCardPosition + this.bufferSpace;
    }
    return 'other';
  }
}
