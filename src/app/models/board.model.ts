import { User } from "@models/user.model";
import { Allcolors } from "@models/colors.model";
import { List } from "@models/list.model";
import { Card } from "@models/card.model";

export interface Board {
  id: string;
  title: string;
  backgroundColor: Allcolors;
  members: User[];
  lists: List[];
  cards: Card[];
}
