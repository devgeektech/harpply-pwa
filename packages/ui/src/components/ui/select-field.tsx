"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
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
  options?: ReadonlyArray<SelectOption>;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

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
            "w-full",
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
