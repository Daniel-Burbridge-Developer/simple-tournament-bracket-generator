import { createFileRoute } from '@tanstack/react-router';
import { ParticipantEntryForm } from '~/components/TournamentEntryFormSimple';
export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Welcome Home!</h1>
      </div>
      <p className="text-muted-foreground">
        This is your tournament bracket generator homepage with shadcn/ui theming.
      </p>
      <div className="space-y-4">
        <div className="rounded-lg border bg-card p-4 text-card-foreground">
          <h2 className="mb-2 text-xl font-semibold">Card Component</h2>
          <p className="text-sm text-muted-foreground">This demonstrates the card styling with proper theming.</p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          Primary Button
        </button>
        <button className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80">
          Secondary Button
        </button>
      </div>
      <ParticipantEntryForm />
    </div>
  );
}
