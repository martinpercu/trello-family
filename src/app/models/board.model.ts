import { User } from "@models/user.model";

export interface Board {
  id: string;
  title: string;
  backgroundColor: 'sky' | 'green' | 'violet' | 'gray' | 'yellow';
  members: User[];
}
