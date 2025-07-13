import { Participant } from './participants';

export interface Bracket {
  id: string;
  name: string;
  participants: Participant[];
}
