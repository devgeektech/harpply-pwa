import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  /** Optional error state – applies destructive border/ring */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20",
          "md:text-sm",
          error &&
            "border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
          className
        )}
        aria-invalid={error ?? props["aria-invalid"]}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
