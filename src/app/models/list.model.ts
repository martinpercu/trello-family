import { Card } from "@models/card.model";

export interface List {
  id: string;
  title: string;
  position: number;
  cards: Card[];
}
