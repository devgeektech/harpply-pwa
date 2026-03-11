import * as React from "react";

import { cn } from "../../lib/utils";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupFieldProps {
  /** Name for the radio group (required for grouping) */
  name: string;
  /** Legend / label for the group */
  label: string;
  /** Options to display */
  options: ReadonlyArray<RadioOption>;
  /** Currently selected value */
  value: string;
  /** Called when selection changes */
  onChange: (value: string) => void;
  /** Optional error state */
  error?: boolean;
  disabled?: boolean;
  className?: string;
  /** id for the fieldset (for accessibility) */
  id?: string;
}

/**
 * Common component for a group of radio buttons. Styled to match other form fields.
 */
function RadioGroupField({
  name,
  label,
  options,
  value,
  onChange,
  error,
  disabled,
  className,
  id,
}: RadioGroupFieldProps) {
  const fieldsetId = id ?? React.useId();

  return (
    <fieldset
      data-slot="radio-group"
      id={fieldsetId}
      className={cn("space-y-2", className)}
      disabled={disabled}
      aria-invalid={error}
    >
      <legend className="block text-sm font-medium text-foreground">
        {label}
      </legend>
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const optId = `${fieldsetId}-${opt.value}`;
          const isChecked = value === opt.value;
          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 text-sm text-foreground",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              <span className="relative inline-flex shrink-0">
                <input
                  data-slot="radio"
                  type="radio"
                  name={name}
                  id={optId}
                  value={opt.value}
                  checked={isChecked}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={disabled}
                  className="peer sr-only"
                  aria-invalid={error}
                />
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full border-2 border-input bg-background shadow-xs transition-colors",
                    "peer-focus-visible:outline-none peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 peer-focus-visible:ring-[3px]",
                    "peer-disabled:pointer-events-none peer-disabled:opacity-50",
                    isChecked && "border-primary"
                  )}
                  aria-hidden
                >
                  <span
                    className={cn(
                      "size-2 rounded-full bg-primary transition-opacity",
                      isChecked ? "opacity-100" : "opacity-0"
                    )}
                  />
                </span>
              </span>
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

RadioGroupField.displayName = "RadioGroupField";

export { RadioGroupField };
