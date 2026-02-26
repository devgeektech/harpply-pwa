import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "./input";
import { cn } from "@repo/ui/lib/utils";

export interface PasswordFieldProps extends Omit<React.ComponentProps<typeof Input>, "type"> {
  /** Whether to show the visibility toggle button */
  showToggle?: boolean;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, showToggle = true, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const mergedRef = (node: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    };

    const toggleVisibility = () => {
      setVisible((v) => !v);
      setTimeout(() => inputRef.current?.focus(), 0);
    };

    return (
      <div data-slot="password-field" className={cn("relative", className)}>
        <Input
          ref={mergedRef}
          type={visible ? "text" : "password"}
          autoComplete={props.autoComplete ?? "current-password"}
          className={cn(showToggle && "pr-9")}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <EyeOff className="size-4" aria-hidden />
            ) : (
              <Eye className="size-4" aria-hidden />
            )}
          </button>
        )}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export { PasswordField };
