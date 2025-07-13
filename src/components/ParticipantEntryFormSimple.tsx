import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from './ui/input';
import { useForm } from '@tanstack/react-form';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, Trash2, Plus, FireExtinguisher } from 'lucide-react';
import { z } from 'zod';
import { FieldErrors } from './form-ui/field-errors';
import { toast } from 'sonner';
import { useParticipantStore } from '@/stores/participantStore';
import { useBracketStore } from '@/stores/bracketStore';

// INVESTIGATE  "FIELD API" to further improve forms modularity
// LOOK at field-errors as an example, I think FIELD API would go where AnyFieldMeta is.

const MIN_PARTICIPANTS = 2;
const MAX_PARTICIPANTS = 16;

const ParticipantEntrySchema = z.object({
  participants: z
    .array(
      z.object({
        id: z
          .string()
          .uuid() as z.ZodType<`${string}-${string}-${string}-${string}-${string}`>,
        name: z
          .string()
          .min(1, 'Name is required')
          .refine((val) => !/\s/.test(val), {
            message: 'Name must be one word, no spaces',
          }),
        imageUrl: z
          .string()
          .refine(
            (val) => val === '' || z.string().url().safeParse(val).success,
            {
              message: 'Must be a valid URL or empty',
            },
          ),
      }),
    )
    .min(MIN_PARTICIPANTS, `At least ${MIN_PARTICIPANTS} participants required`)
    .max(MAX_PARTICIPANTS, `At most ${MAX_PARTICIPANTS} participants allowed`)
    .refine((arr) => arr.length > 0 && (arr.length & (arr.length - 1)) === 0, {
      message: 'Number of participants must be a power of 2',
    }),
  // .refine checks if the number is a power of 2 using (n & (n - 1)) === 0,
  // which is true only if n has a single 1 in its binary representation. (eg a power of 2)
});

interface ParticipantEntryFormProps {
  minParticipants?: number;
  maxParticipants?: number;
}

export const ParticipantEntryForm = ({
  minParticipants = MIN_PARTICIPANTS,
  maxParticipants = MAX_PARTICIPANTS,
}: ParticipantEntryFormProps) => {
  const { addParticipants, resetParticipants } = useParticipantStore();
  const { generateBrackets } = useBracketStore();

  const form = useForm({
    defaultValues: {
      participants: [
        { id: crypto.randomUUID(), name: '', imageUrl: '' },
        { id: crypto.randomUUID(), name: '', imageUrl: '' },
      ],
    },
    validators: {
      onMount: ParticipantEntrySchema,
      onChange: ParticipantEntrySchema,
    },
    onSubmit: ({ value }) => {
      resetParticipants();
      addParticipants(value.participants);
      generateBrackets(value.participants);
      toast.success('Tournament created successfully', {
        description: 'You can now view the tournament',
      });
      form.reset();
    },
  });

  return (
    <Card className="w-md mx-auto">
      <CardHeader>
        <CardTitle>Participant Entry</CardTitle>
        <CardDescription>
          Enter the names and images of the participants in the tournament.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="participants"
              mode="array"
              children={(field) => (
                <>
                  {field.state.value.map((_, index) => (
                    <Card
                      key={index}
                      className="flex w-full flex-col border-none p-2"
                    >
                      <CardHeader className="p-4 pl-1">
                        <CardTitle>Participant {index + 1}</CardTitle>
                      </CardHeader>
                      <div className="flex w-full flex-row gap-2">
                        <div className="flex w-full flex-col gap-2">
                          <form.Field
                            name={`participants[${index}].name`}
                            children={(subField) => (
                              <div>
                                <Input
                                  value={subField.state.value}
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
                                  onBlur={() => subField.handleBlur()}
                                  placeholder={`Participant ${index + 1} Name`}
                                  autoFocus
                                />
                                <FieldErrors meta={subField.state.meta} />
                              </div>
                            )}
                          />

                          <form.Field
                            name={`participants[${index}].imageUrl`}
                            children={(subField) => (
                              <div>
                                <Input
                                  value={subField.state.value}
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
                                  onBlur={() => subField.handleBlur()}
                                  placeholder={`Participant ${index + 1} Image URL (optional)`}
                                />
                                <FieldErrors meta={subField.state.meta} />
                              </div>
                            )}
                          />
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => field.removeValue(index)}
                          disabled={field.state.value.length <= minParticipants}
                          className="px-2"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant={'outline'}
                    onClick={() =>
                      field.pushValue({
                        id: crypto.randomUUID(),
                        name: '',
                        imageUrl: '',
                      })
                    }
                    disabled={field.state.value.length >= maxParticipants}
                    className="mx-auto flex w-1/2"
                  >
                    <Plus /> Add Participant
                  </Button>
                </>
              )}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {/* Display form-level validation errors prominently */}

        <div className="flex w-full items-end justify-between gap-x-4">
          <form.Subscribe
            selector={(state) => state.isDirty}
            children={(isDirty) => (
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  form.reset();
                }}
                disabled={!isDirty}
              >
                Reset
              </Button>
            )}
          />
          <form.Subscribe
            selector={(state) => state.errors}
            children={(errors) => {
              // Debug: Log all errors to see what's being generated
              // Extract only participants array-level errors
              const participantsErrors = errors
                .filter((errorObj) => errorObj && errorObj.participants)
                .flatMap((errorObj) => errorObj!.participants)
                .map((error) => error.message);

              return (
                participantsErrors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Validation Error</AlertTitle>
                    <AlertDescription>
                      {participantsErrors.join(', ')}
                    </AlertDescription>
                  </Alert>
                )
              );
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isValidating]}
            children={([canSubmit, isValidating]) => (
              <Button
                variant="default"
                onClick={form.handleSubmit}
                disabled={!canSubmit || isValidating}
              >
                Create Tournament
              </Button>
            )}
          />
        </div>
      </CardFooter>
    </Card>
  );
};
