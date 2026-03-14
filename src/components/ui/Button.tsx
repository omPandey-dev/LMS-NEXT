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
      'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-900';

     const variants = {
      primary:
        'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-xl focus:ring-blue-400 transition-all',
      secondary: 'bg-gradient-to-r from-slate-100 to-blue-50 text-slate-700 hover:from-slate-200 hover:to-blue-100 focus:ring-slate-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
      outline:
        'border-2 border-blue-400 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 focus:ring-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/40',
      ghost: 'text-slate-700 hover:bg-blue-50/60 focus:ring-slate-300 dark:text-gray-200 dark:hover:bg-gray-800',
     };
 
     const sizes = {
       sm: 'px-3 py-1.5 text-sm',
       md: 'px-4 py-2 text-base',
       lg: 'px-6 py-3 text-lg',
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
