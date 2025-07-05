import { useFieldContext } from "~/hooks/form-context";

export function NumberField({ label }: { label: string }) {
  // The `Field` infers that it should have a `value` type of `string`
  const field = useFieldContext<number>();
  return (
    <label>
      <div>{label}</div>
      <input
        type="number"
        value={field.state.value}
        onChange={(e) => field.handleChange(Number(e.target.value))}
      />
    </label>
  );
}
