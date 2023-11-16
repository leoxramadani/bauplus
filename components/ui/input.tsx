import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border border-input bg-background px-3 
           py-2 text-sm ring-indigo-400 ring-offset-background transition-all 
           file:border-0 file:bg-transparent file:text-sm 
           file:font-medium placeholder:text-muted-foreground
           hover:ring-1 hover:ring-primary
           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 
           disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
