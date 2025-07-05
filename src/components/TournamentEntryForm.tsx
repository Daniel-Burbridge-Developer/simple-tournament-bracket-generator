import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "~/hooks/form-context";
import { TextField } from "./form-ui/text-field";
import { NumberField } from "./form-ui/number-field";
import { SubmitButton } from "./form-ui/submit-button";
import { z } from "zod";

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

const TournamentEntryForm = () => {
  const form = useAppForm({
    defaultValues: {
      username: "",
      age: 0,
    },
    validators: {
      // Pass a schema or function to validate
      onChange: z.object({
        username: z.string(),
        age: z.number().min(13),
      }),
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <h1>Personal Information</h1>
      {/* Components are bound to `form` and `field` to ensure extreme type safety */}
      {/* Use `form.AppField` to render a component bound to a single field */}
      <form.AppField
        name="username"
        children={(field) => <field.TextField label="Full Name" />}
      />
      {/* The "name" property will throw a TypeScript error if typo'd  */}
      <form.AppField
        name="age"
        children={(field) => <field.NumberField label="Age" />}
      />
      {/* Components in `form.AppForm` have access to the form context */}
      <form.AppForm>
        <form.SubmitButton label="Submit" />
      </form.AppForm>
    </form>
  );
};

export default TournamentEntryForm;
