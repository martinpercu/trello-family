import { List } from "@models/list.model";


export interface Card {
  id: string;
  title: string;
  description?: string;
  position: number;
  list: List;
}

// export interface CreateCardDto {
//   title: string;
//   description?: string;
//   position: number;
//   listId: string;
//   boardId: string;
// }

// this is the same as above!!!
export interface CreateCardDto extends Omit<Card, 'id' | 'list'>  {
  listId: string;
  boardId: string;
}


export interface UpdatedCardDto {
  title?: string;
  description?: string;
  position?: number;
  listId?: number | string;
  boardId?: string;
}
