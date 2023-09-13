import { List } from "@models/list.model";


export interface Card {
  id: string;
  title: string;
  description: string;
  position: number;
  list: List;
}
