import * as React from "react";

import { cn } from "@/lib/utils/shadcn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ring-offset-neutral dark:ring-offset-black flex h-10 w-full rounded-md border border-border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground enabled:hover:ring-2 enabled:hover:ring-base-foreground enabled:focus-visible:border-none enabled:focus-visible:outline-none enabled:focus-visible:ring-2 enabled:focus-visible:ring-ring enabled:focus-visible:ring-offset-2 disabled:opacity-50 dark:bg-neutral-900",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
