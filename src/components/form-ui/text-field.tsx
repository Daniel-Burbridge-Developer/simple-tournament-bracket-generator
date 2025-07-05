import { useFieldContext } from "~/hooks/form-context";
import { Input } from "../ui/input";

export function TextField({ label }: { label: string }) {
  // The `Field` infers that it should have a `value` type of `string`
  const field = useFieldContext<string>();
  return (
    <label>
      <div>{label}</div>
      <Input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.errors.length > 0 && (
        <div className="text-red-500 text-sm mt-1">
          {field.state.meta.errors.map((error) => error.message).join(", ")}
        </div>
      )}
    </label>
  );
}
