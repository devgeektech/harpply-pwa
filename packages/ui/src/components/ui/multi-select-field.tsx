import * as React from "react";
import { ChevronDown, X } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface MultiSelectFieldProps {
  id?: string;
  options: ReadonlyArray<SelectOption>;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

function MultiSelectField({
  id,
  options,
  value,
  onChange,
  placeholder = "Select…",
  error,
  disabled,
  className,
  "aria-label": ariaLabel,
}: MultiSelectFieldProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const remove = (e: React.MouseEvent, optValue: string) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optValue));
  };

  React.useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div
      ref={containerRef}
      data-slot="multi-select-field"
      className={cn("relative", className)}
    >
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={error}
        className={cn(
          "flex min-h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors",
          "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "disabled:pointer-events-none disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          "w-full cursor-pointer text-left",
          error && "border-destructive ring-destructive/20 dark:ring-destructive/40"
        )}
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <span className="flex flex-wrap items-center gap-1.5">
          {value.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            value.map((v) => {
              const opt = options.find((o) => o.value === v);
              const label = opt?.label ?? v;
              return (
                <span
                  key={v}
                  className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  {label}
                  <span
                    role="button"
                    tabIndex={0}
                    className="rounded p-0.5 hover:bg-secondary-foreground/20 cursor-pointer"
                    onClick={(e) => remove(e, v)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(value.filter((val) => val !== v));
                      }
                    }}
                    aria-label={`Remove ${label}`}
                  >
                    <X className="size-3" aria-hidden />
                  </span>
                </span>
              );
            })
          )}
          <ChevronDown
            className={cn(
              "ml-auto size-4 shrink-0 text-muted-foreground",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-multiselectable
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-input bg-popover py-1 text-sm shadow-md"
        >
          {options.map((opt) => {
            const selected = value.includes(opt.value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={selected}
                className={cn(
                  "flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground",
                  selected && "bg-accent/50"
                )}
                onClick={() => toggle(opt.value)}
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded border border-input",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background"
                  )}
                  aria-hidden
                >
                  {selected ? (
                    <svg
                      className="size-2.5"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 6l3 3 5-6" />
                    </svg>
                  ) : null}
                </span>
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

MultiSelectField.displayName = "MultiSelectField";

export { MultiSelectField };
