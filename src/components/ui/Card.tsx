
   import { HTMLAttributes, ReactNode } from 'react';
   import { cn } from '@/utils/cn';
   
   interface CardProps extends HTMLAttributes<HTMLDivElement> {
     children: ReactNode;
   }
   
   export const Card = ({ className, children, ...props }: CardProps) => {
     return (
      <div
        className={cn(
          'rounded border border-[var(--app-border)] bg-[var(--app-panel)] p-4 text-[var(--app-text-soft)] shadow-sm transition-colors',
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
      <h3 className={cn('text-sm font-semibold text-[var(--app-text)]', className)} {...props}>
         {children}
       </h3>
     );
   };
   
