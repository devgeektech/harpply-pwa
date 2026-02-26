import * as React from "react";

import { Input } from "./input";

export interface EmailFieldProps extends Omit<React.ComponentProps<typeof Input>, "type"> {}

/**
 * Common component for email input. Wraps Input with type="email".
 */
const EmailField = React.forwardRef<HTMLInputElement, EmailFieldProps>(
  (props, ref) => {
    return (
      <Input
        ref={ref}
        type="email"
        autoComplete="email"
        inputMode="email"
        {...props}
      />
    );
  }
);

EmailField.displayName = "EmailField";

export { EmailField };
