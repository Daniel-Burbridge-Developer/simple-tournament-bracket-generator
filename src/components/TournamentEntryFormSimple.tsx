import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useForm } from '@tanstack/react-form';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, LoaderCircle, X, Trash2, Plus, User } from 'lucide-react';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ZodError } from 'zod';
import { Meta } from '@tanstack/react-start';
import { FieldErrors } from './form-ui/field-errors';
import { toast } from 'sonner';

const MIN_PARTICIPANTS = 2;
const MAX_PARTICIPANTS = 16;

interface Participant {
  name: string;
  imageUrl: string;
}

const ParticipantEntrySchema = z.object({
  participants: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        imageUrl: z.string().refine((val) => val === '' || z.string().url().safeParse(val).success, {
          message: 'Must be a valid URL or empty',
        }),
      }),
    )
    .min(MIN_PARTICIPANTS, `At least ${MIN_PARTICIPANTS} participants required`)
    .max(MAX_PARTICIPANTS, `At most ${MAX_PARTICIPANTS} participants allowed`),
});

interface ParticipantEntryFormProps {
  minParticipants?: number;
  maxParticipants?: number;
}

export const ParticipantEntryForm = ({
  minParticipants = MIN_PARTICIPANTS,
  maxParticipants = MAX_PARTICIPANTS,
}: ParticipantEntryFormProps) => {
  const form = useForm({
    defaultValues: {
      participants: [
        { name: '', imageUrl: '' },
        { name: '', imageUrl: '' },
      ],
    },
    validators: {
      onChange: ParticipantEntrySchema,
    },
    onSubmit: ({ value }) => {
      toast.success('Tournament created successfully', {
        description: 'You can now view the tournament',
      });
    },
  });

  return (
    <Card className="w-md mx-auto">
      <CardHeader>
        <CardTitle>Participant Entry</CardTitle>
        <CardDescription>Enter the names and images of the participants in the tournament.</CardDescription>
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
                    <Card key={index} className="flex w-full flex-col border-none p-2">
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
                                  onChange={(e) => subField.handleChange(e.target.value)}
                                  onBlur={() => subField.handleBlur()}
                                  placeholder={`Participant ${index + 1} Name`}
                                  autoFocus
                                />
                                <div className="pl-2">
                                  <FieldErrors meta={subField.state.meta} />
                                </div>
                              </div>
                            )}
                          />

                          <form.Field
                            name={`participants[${index}].imageUrl`}
                            children={(subField) => (
                              <div>
                                <Input
                                  value={subField.state.value}
                                  onChange={(e) => subField.handleChange(e.target.value)}
                                  onBlur={() => subField.handleBlur()}
                                  placeholder={`Participant ${index + 1} Image URL (optional)`}
                                />
                                <div className="pl-2">
                                  <FieldErrors meta={subField.state.meta} />
                                </div>
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
                    onClick={() => field.pushValue({ name: '', imageUrl: '' })}
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
      <CardFooter className="flex justify-between">
        <Button variant="destructive" type="button" onClick={() => form.reset()}>
          Reset
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isValidating]}
          children={([canSubmit, isValidating]) => (
            <Button variant="default" onClick={form.handleSubmit} disabled={!canSubmit || isValidating}>
              Create Tournament
            </Button>
          )}
        />
      </CardFooter>
    </Card>
  );
};
