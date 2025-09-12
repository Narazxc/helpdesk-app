import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      // className={cn(
      //   `file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      //   "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      //   "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
      //   focus:outline-hidden focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-brand-500/20 focus:border-brand-300 dark:focus:border-brand-800
      //   `,
      //   className
      // )}

      // className={cn(
      //   // focus-visible:ring-ring/50 focus-visible:ring-[3px]
      //   "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      //   "focus-visible:border-ring focus:ring-3 focus:ring-blue-500  focus:border-brand-300 dark:focus:border-brand-800",
      //   "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      //   "focus:outline-hidden focus:outline-none",
      //   className
      // )}
      className={cn(
        `h-11 w-full appearance-none text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:placeholder:text-white/30 px-3 py-2 border rounded-md focus:outline-none dark:bg-gray-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`,
        className
      )}
      {...props}
    />
  );
}

export { Input };
