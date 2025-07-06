// src/hooks/form-context.ts
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "~/components/form-ui/text-field";
import { NumberField } from "~/components/form-ui/number-field";
import { ArrayField } from "~/components/form-ui/array-field";
import { SubmitButton } from "~/components/form-ui/submit-button";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    ArrayField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
