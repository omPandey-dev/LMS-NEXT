
   import { HTMLAttributes, ReactNode } from 'react';
   import { cn } from '@/utils/cn';
   
   interface CardProps extends HTMLAttributes<HTMLDivElement> {
     children: ReactNode;
   }
   
   export const Card = ({ className, children, ...props }: CardProps) => {
     return (
      <div
        className={cn(
          'rounded-xl border border-blue-100/60 bg-white/90 backdrop-blur-sm p-6 shadow-lg shadow-blue-100/20 transition-colors dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900/20',
          className,
        )}
        {...props}
      >
         {children}
       </div>
     );
   };
   
   interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
     children: ReactNode;
   }
   
   export const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
     return (
       <div className={cn('mb-4', className)} {...props}>
         {children}
       </div>
     );
   };
   
   interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
     children: ReactNode;
   }
   
   export const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
     return (
      <h3 className={cn('text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-gray-100', className)} {...props}>
         {children}
       </h3>
     );
   };
   