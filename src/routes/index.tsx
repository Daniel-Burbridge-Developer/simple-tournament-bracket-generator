import { createFileRoute } from "@tanstack/react-router";
import { TournmentEntryForm } from "~/components/TournmentEntryForm";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Welcome Home!</h1>
      </div>
      <p className="text-muted-foreground">
        This is your tournament bracket generator homepage with shadcn/ui
        theming.
      </p>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-2">Card Component</h2>
          <p className="text-sm text-muted-foreground">
            This demonstrates the card styling with proper theming.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          Primary Button
        </button>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80">
          Secondary Button
        </button>
      </div>
      <TournmentEntryForm />
    </div>
  );
}
