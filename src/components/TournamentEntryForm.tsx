import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '~/hooks/form-context';
import { TextField } from './form-ui/text-field';
import { NumberField } from './form-ui/number-field';
import { SubmitButton } from './form-ui/submit-button';
import { z } from 'zod';
import { useAppForm } from '~/hooks/form-context';

// Zod Schema
const EntrySchema = z.object({
  participants: z.array(z.object({
    name: z.string().min(1, 'Name is required'),
    imageUrl: z.string().refine(val => val === '' || z.string().url().safeParse(val).success, {
      message: 'Must be a valid URL or empty'
    })
  })).min(2, 'At least 2 participants required'),
});

const TournamentEntryForm = () => {
  const form = useAppForm({
    defaultValues: {
      participants: [
        { name: '', imageUrl: '' },
        { name: '', imageUrl: '' }
      ],
    },
    validators: {
      // Pass a schema or function to validate
      onChange: EntrySchema,
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-card sm:p-8">
      <h1 className="text-center text-2xl font-bold">Tournament Participants</h1>
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
          name="participants"
          children={(field) => <field.ArrayField label="Tournament Participants" itemLabel="Participant" minItems={2} maxItems={16} />}
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
