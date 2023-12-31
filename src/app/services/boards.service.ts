import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '@environments/environment'

import { User } from '@models/user.model';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';
import { List } from '@models/list.model';


import { checkToken } from '@interceptors/token.interceptor';
import { Allcolors } from '@models/colors.model';

import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  apiUrl = environment.API_URL;

  bufferSpace = 65535

  backgroundColor$ = new BehaviorSubject<Allcolors>('sky');

  private http = inject(HttpClient);

  getBoard(id: Board['id'])  {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken()
    })
    // .pipe(
    //   tap(board => this.setBackgroundColor(board.backgroundColor))
    // )
    ;
  }

  createBoard(title: string, backgroundColor: Allcolors) {
    return this.http.post<Board>(`${this.apiUrl}/api/v1/boards`, {
      title,
      backgroundColor
    }, {
      context: checkToken(),
    })
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
    return 0; // is important to return a number!!!!! Because the position is number so in the update the typing must be a number.
  }


  // getPositionOfNewCard(cards: Card[]) {
  //   if (cards.length === 0) { // this means card is empty (when is a new card)
  //     console.log('Is New Card');
  //     return this.bufferSpace;
  //   }
  //   const lastIndex = cards.length - 1;
  //   const theLastCardPosition = cards[lastIndex].position;
  //   return theLastCardPosition + this.bufferSpace;
  // }

  // getPositionOfNewList(lists: List[]) {
  //   if (lists.length === 0) {
  //     console.log('Is New Card');
  //     return this.bufferSpace;
  //   }
  //   const lastIndex = lists.length - 1;
  //   const theLastCardPosition = lists[lastIndex].position;
  //   return theLastCardPosition + this.bufferSpace;
  // }

  getPositionOfNewElement(elements: Card[] | List[]) {
    if (elements.length === 0) {
      console.log('Is New Card');
      return this.bufferSpace;
    }
    const lastIndex = elements.length - 1;
    const theLastCardPosition = elements[lastIndex].position;
    return theLastCardPosition + this.bufferSpace;
  }

  setBackgroundColor(color: Allcolors) {
    this.backgroundColor$.next(color);
  }

}
