import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { Input } from "~/components/ui/input";

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  // We'll learn more about these options later
  fieldComponents: {
    TextField,
  },
  formComponents: {},
});

export const TournmentEntryForm = () => {
  const form = useAppForm({
    // Supports all useForm options
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
    },
  });

  return (
    <form.AppField
      name="firstName"
      children={(field) => <field.TextField label="First Name" />}
    />
  );
};

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
    </label>
  );
}
