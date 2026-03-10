import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

export interface CheckboxFieldProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  /** Label shown next to the checkbox */
  label: string;
  /** Optional error state */
  error?: boolean;
}

/**
 * Common component for checkbox with label. Styled to match other form fields.
 */
const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ id, label, className, error, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <span className="relative inline-flex shrink-0">
          <input
            data-slot="checkbox"
            ref={ref}
            type="checkbox"
            id={inputId}
            disabled={disabled}
            className="peer sr-only"
            aria-invalid={error}
            {...props}
          />
          <span
            className={cn(
              "flex size-4 items-center justify-center rounded border border-input bg-background shadow-xs transition-colors",
              "peer-focus-visible:outline-none peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 peer-focus-visible:ring-[3px]",
              "peer-disabled:pointer-events-none peer-disabled:opacity-50",
              "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:[&_svg]:opacity-100",
              error && "border-destructive ring-destructive/20 dark:ring-destructive/40"
            )}
          >
            <Check className="size-2.5 opacity-0 transition-opacity" aria-hidden />
          </span>
        </span>
        {label}
      </label>
    );
  }
);

CheckboxField.displayName = "CheckboxField";

export { CheckboxField };
