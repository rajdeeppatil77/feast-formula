import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost' | 'outline' | 'icon';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, variant = 'primary', size = 'md', isLoading, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
                    {
                        'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-orange-500/20 active:scale-95': variant === 'primary',
                        'text-gray-300 hover:text-white hover:bg-white/5': variant === 'ghost',
                        'border border-white/10 text-white hover:bg-white/5': variant === 'outline',
                        'text-gray-300 hover:text-white hover:bg-white/10 aspect-square': variant === 'icon',
                        'px-6 py-2.5 text-sm': size === 'md' && variant !== 'icon',
                        'px-8 py-3 text-base': size === 'lg' && variant !== 'icon',
                        'px-4 py-2 text-xs': size === 'sm' && variant !== 'icon',
                        'p-2.5': variant === 'icon',
                    },
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button };
