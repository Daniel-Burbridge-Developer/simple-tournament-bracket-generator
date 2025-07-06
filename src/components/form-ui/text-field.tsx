import { useFieldContext } from "~/hooks/form-context";
import { Input } from "../ui/input";
import { FieldErrors } from "./field-errors";
import { Label } from "../ui/label";

export function TextField({ label }: { label: string }) {
  // The `Field` infers that it should have a `value` type of `string`
  const field = useFieldContext<string>();
  return (
    <div className="space-y-1">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={() => field.handleBlur()}
      />
      <FieldErrors meta={field.state.meta} />
    </div>
  );
}
