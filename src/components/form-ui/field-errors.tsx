import { AnyFieldMeta } from '@tanstack/react-form';
import { AlertCircle } from 'lucide-react';
import { ZodError } from 'zod';
import { Alert, AlertDescription } from '../ui/alert';

type FieldErrorsProps = {
  meta: AnyFieldMeta;
};

export const FieldErrors = ({ meta }: FieldErrorsProps) => {
  // Don't show errors if field hasn't been touched or is currently being validated
  if (!meta.isTouched || meta.isValidating) return null;

  // Deduplicate error messages by content
  const uniqueErrors = meta.errors.filter(
    (error, index, array) => array.findIndex((e) => e.message === error.message) === index,
  );

  return uniqueErrors.map(({ message }: ZodError, index) => (
    <Alert variant="destructive" key={index} className="mt-2">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="mt-1">{message}</AlertDescription>
    </Alert>
  ));
};
