import { useFieldContext } from "~/hooks/form-context";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldErrors } from "./field-errors";
import {FieldApi} from "@tanstack/react-form"



export function ParticipantField({ label }: { label: string }) {
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