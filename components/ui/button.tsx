import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-destructive-foreground hover:bg-[#6265F9] active:bg-[#6265F9] focus:ring-4 focus:ring-[#6E71F1]/50',
        destructive:
          'bg-[#FE464B] text-destructive-foreground hover:bg-[#FE464B] active:bg-[#FE464B] focus:ring-4 focus:ring-[#FE464B]/50',
        outline:
          'border border-input bg-background active:bg-gray-100 hover:bg-accent hover:text-accent-foreground focus:ring-4 focus:ring-gray-200',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-4 focus:ring-secondary/50 border-primary text-primary hover:bg-primary hover:text-white',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-11 rounded-lg px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant, size, loading = false, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading === true && (
          <Loader2 className="mr-1 animate-spin" size={18} />
        )}
        <span className={className}>{children}</span>
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
