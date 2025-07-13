import { Participant } from './participants';

export interface SingleEliminationBracket {
  id: string;
  name: string;
  participants: [Participant, Participant];
  winner: Participant | null;
}
