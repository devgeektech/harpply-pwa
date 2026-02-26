import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  /** Optional error state – applies destructive border/ring */
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "flex min-h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-xs transition-[color,box-shadow]",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "disabled:pointer-events-none disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          "field-sizing-content md:text-sm",
          error &&
            "border-destructive ring-destructive/20 dark:ring-destructive/40",
          className
        )}
        aria-invalid={error ?? props["aria-invalid"]}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
