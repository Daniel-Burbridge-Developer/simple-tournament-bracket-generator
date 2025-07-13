import { create } from 'zustand';
import { Participant } from '@/types/participants';

interface ParticipantState {
  participants: Participant[];
  addParticipant: (participant: Participant) => void;
  addParticipants: (participants: Participant[]) => void;
  removeParticipant: (id: string) => void;
  updateParticipant: (id: string, participant: Participant) => void;
  resetParticipants: () => void;
}

export const useParticipantStore = create<ParticipantState>()((set) => ({
  participants: [],
  addParticipant: (participant) =>
    set((state) => ({ participants: [...state.participants, participant] })),
  addParticipants: (participants) =>
    set((state) => ({
      participants: [...state.participants, ...participants],
    })),
  removeParticipant: (id) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    })),
  updateParticipant: (id, participant) =>
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === id ? participant : p,
      ),
    })),
  resetParticipants: () => set({ participants: [] }),
}));
