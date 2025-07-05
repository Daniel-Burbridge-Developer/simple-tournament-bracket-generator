import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '~/hooks/form-context';
import { TextField } from './form-ui/text-field';
import { NumberField } from './form-ui/number-field';
import { SubmitButton } from './form-ui/submit-button';
import { z } from 'zod';

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

const EntryFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  age: z.number().min(13, 'Age must be at least 13'),
});

const TournamentEntryForm = () => {
  const form = useAppForm({
    defaultValues: {
      username: '',
      age: 18,
    },
    validators: {
      // Pass a schema or function to validate
      onChange: EntryFormSchema,
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-card sm:p-8">
      <h1 className="text-center text-2xl font-bold">Personal Information</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Components are bound to `form` and `field` to ensure extreme type safety */}
        {/* Use `form.AppField` to render a component bound to a single field */}
        <form.AppField
          name="username"
          mode="array"
          children={(field) => <field.TextField label="Full Name" />}
        />
        {/* The "name" property will throw a TypeScript error if typo'd  */}
        <form.AppField
          name="age"
          mode="array"
          children={(field) => <field.NumberField label="Age" />}
        />
        {/* Components in `form.AppForm` have access to the form context */}
        <form.AppForm>
          <form.SubmitButton label="Submit" />
        </form.AppForm>
      </form>
    </div>
  );
};

export default TournamentEntryForm;
