"use client";

import * as React from "react";

import { cn } from "@repo/ui/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  id?: string;
  /** Options to render */
  options?: ReadonlyArray<SelectOption>;
  /** Placeholder when nothing selected */
  placeholder?: string;
  /** Current value (controlled) */
  value?: string;
  /** Called when value changes – receives synthetic change event for compatibility */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Optional error state */
  error?: boolean;
  disabled?: boolean;
  className?: string;
  /** Optional custom item children instead of options */
  children?: React.ReactNode;
}

/**
 * Common component for select (dropdown) using shadcn/Radix Select.
 * Use with options prop or pass SelectItem children.
 */
const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(
  (
    {
      id,
      className,
      options,
      placeholder,
      value = "",
      onChange,
      error,
      disabled,
      children,
    },
    ref
  ) => {
    const handleValueChange = React.useCallback(
      (v: string) => {
        onChange?.({
          target: { value: v } as HTMLSelectElement,
        } as React.ChangeEvent<HTMLSelectElement>);
      },
      [onChange]
    );

    return (
      <Select
        value={value || undefined}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          ref={ref}
          id={id}
          className={cn(
            className,
            error &&
              "border-destructive ring-destructive/20 aria-invalid:ring-destructive/20"
          )}
          aria-invalid={error}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options
            ? options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))
            : children}
        </SelectContent>
      </Select>
    );
  }
);

SelectField.displayName = "SelectField";

export { SelectField };
