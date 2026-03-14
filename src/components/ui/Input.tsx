
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
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">
               {label}
             </label>
           )}
           <input
             ref={ref}
             className={cn(
              'w-full rounded-lg border px-4 py-2.5 transition-all duration-200',
              'bg-white text-slate-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400',
              'disabled:cursor-not-allowed disabled:bg-slate-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-900',
               error
                 ? 'border-rose-400 focus:ring-rose-400'
                : 'border-blue-200/60 hover:border-blue-300/60 dark:hover:border-gray-500',
              className,
             )}
             {...props}
           />
          {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
         </div>
       );
    },
   );
   
   Input.displayName = 'Input';
   