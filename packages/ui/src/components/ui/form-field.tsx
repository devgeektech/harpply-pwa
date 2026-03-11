import * as React from "react";

import { cn } from "../../lib/utils";

export interface FormFieldProps {
  /** Label text for the field */
  label: string;
  /** id for the input – must match the controlled input’s id for accessibility */
  id: string;
  /** The input element (e.g. Input, PasswordField, Textarea) */
  children: React.ReactNode;
  /** Optional class for the wrapper div */
  className?: string;
  /** Optional error message (e.g. from react-hook-form formState.errors) */
  error?: string;
}

/**
 * Wraps a form input with a label. Use with Input, PasswordField, or Textarea.
 */
function FormField({ label, id, children, className, error }: FormFieldProps) {
  return (
    <div data-slot="form-field" className={cn("space-y-1", className)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

FormField.displayName = "FormField";

export { FormField };
