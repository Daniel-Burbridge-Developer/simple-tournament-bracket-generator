import { useParticipantStore } from '~/stores/participantStore';
import type { Participant } from '@/types/participants';
import { Card } from './ui/card';

const ParticipantList = () => {
  const { participants } = useParticipantStore();
  const defaultUrl =
    'https://hep3ebftos.ufs.sh/f/s3a8aj7Ld5akdGkoLfMkhuS4rbz0HNFRG8AWEnmViTapJ6fc';

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {participants.map((participant: Participant) => (
        <Card key={participant.id} className="flex items-center gap-4 p-4">
          <div className="flex-shrink-0">
            <img
              src={
                participant.imageUrl && participant.imageUrl.trim() !== ''
                  ? participant.imageUrl
                  : defaultUrl
              }
              alt={participant.name}
              className="h-12 w-12 rounded-full border bg-muted object-cover"
              onError={(e) => {
                // fallback to defaultUrl if image fails to load
                if (e.currentTarget.src !== defaultUrl) {
                  e.currentTarget.src = defaultUrl;
                }
              }}
            />
          </div>
          <div className="flex-1">
            <div className="font-semibold">{participant.name}</div>
            {participant.imageUrl && participant.imageUrl.trim() !== '' && (
              <div className="break-all text-xs text-muted-foreground">
                {participant.imageUrl}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ParticipantList;
