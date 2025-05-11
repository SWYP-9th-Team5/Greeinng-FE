import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'point' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  disalbed?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  color = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    'text-center disabled:cursor-not-allowed font-HappinessB text-[#fff] w-full whitespace-nowrap';

  const colorStyles = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    point: 'bg-point',
    gray: 'bg-[#ddd] text-[#666]',
  };

  const sizeStyles = {
    sm: 'h-[23px] rounded-[30px] text-xs font-HappinessR md:h-[30px] md:text-[1rem]',
    md: 'h-[40px] rounded-[30px] text-sm md:text-[1rem] md:h-[44px]',
    lg: 'h-[38px] rounded-[50px] text-sm md:text-[1rem] md:h-[54px]',
  };

  return (
    <button
      className={cn(
        baseStyles,
        colorStyles[color],
        sizeStyles[size],
        className,
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? '로딩중...' : children}
    </button>
  );
}
