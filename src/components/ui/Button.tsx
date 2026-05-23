 import { ButtonHTMLAttributes, forwardRef } from 'react';
 import { cn } from '@/utils/cn';
 
 interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
   size?: 'sm' | 'md' | 'lg';
   isLoading?: boolean;
 }
 
 export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {

    const baseStyles =
      'inline-flex items-center justify-center rounded border font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] disabled:cursor-not-allowed disabled:opacity-50';

     const variants = {
      primary:
        'border-[var(--app-accent)] bg-[var(--app-accent)] text-white hover:brightness-95',
      secondary: 'border-[var(--app-border)] bg-[var(--app-panel-muted)] text-[var(--app-text)] hover:bg-[var(--app-hover)]',
      outline:
        'border-[var(--app-border)] bg-transparent text-[var(--app-text-soft)] hover:bg-[var(--app-hover)] hover:text-[var(--app-text)]',
      ghost: 'border-transparent bg-transparent text-[var(--app-text-soft)] hover:bg-[var(--app-hover)] hover:text-[var(--app-text)]',
     };
 
     const sizes = {
       sm: 'px-2.5 py-1.5 text-xs',
       md: 'px-3 py-2 text-xs',
       lg: 'px-4 py-2.5 text-sm',
     };
 
     return (
       <button
         ref={ref}
         className={cn(baseStyles, variants[variant], sizes[size], className)}
         disabled={disabled || isLoading}
         {...props}
       >
         {isLoading ? (
           <>
            <svg className="-ml-1 mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             Loading...
           </>
         ) : (
           children
         )}
       </button>
     );
  },
 );
 
 Button.displayName = 'Button';
