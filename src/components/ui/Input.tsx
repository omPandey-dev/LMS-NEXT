
   import { InputHTMLAttributes, forwardRef } from 'react';
   import { cn } from '@/utils/cn';
   
   interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
     label?: string;
     error?: string;
   }
   
   export const Input = forwardRef<HTMLInputElement, InputProps>(
     ({ className, label, error, ...props }, ref) => {
       return (
         <div className="w-full">
           {label && (
            <label className="mb-1.5 block text-xs font-medium text-[var(--app-text-soft)]">
               {label}
             </label>
           )}
           <input
             ref={ref}
             className={cn(
              'w-full rounded border px-3 py-2 text-sm transition-all duration-200',
              'border-[var(--app-border)] bg-[var(--app-panel)] text-[var(--app-text)] focus:border-[var(--app-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]',
              'disabled:cursor-not-allowed disabled:bg-[var(--app-panel-muted)] disabled:text-[var(--app-muted)]',
              error
                 ? 'border-rose-400 focus:ring-rose-400'
                : 'hover:border-[var(--app-accent)]',
              className,
             )}
             {...props}
           />
          {error && <p className="mt-1 text-xs text-[var(--app-danger)]">{error}</p>}
         </div>
       );
    },
   );
   
   Input.displayName = 'Input';
   
