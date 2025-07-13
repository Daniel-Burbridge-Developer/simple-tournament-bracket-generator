import { useFormContext } from "~/hooks/form-context";
import { Button } from "../ui/button";

export function SubmitButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        isValid: state.isValid,
      })}
    >
      {({ isSubmitting, isValid }) => (
        <Button
          variant="outline"
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Submitting..." : label}
        </Button>
      )}
    </form.Subscribe>
  );
}
