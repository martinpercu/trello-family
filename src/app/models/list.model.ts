import { Card } from "@models/card.model";

export interface List {
  id: string;
  title: string;
  position: number;
  cards: Card[];
  showCardForm?: boolean;
}


export interface CreateListDto extends Omit<List, 'id' | 'list' | 'cards' | 'showCardForm'>  {
  boardId: string;
}

// export interface CreateListDto {
//   title: string;
//   position: number;
//   boardId: string;
// }
