import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type ChipProps = PropsWithChildren<{
  className?: string;
  variant?: 'contained' | 'outlined';
  onClick?: () => void;
}>;

export const Chip = ({
  children,
  className: _className = '',
  variant = 'outlined',
  onClick,
}: ChipProps) => {
  const baseClassName =
    'inline-flex items-center justify-center border rounded-full px-2 pt-0.5 min-w-10 transition-all';

  const cursorClassName = onClick ? 'cursor-pointer' : '';

  const colorClassName =
    variant === 'contained'
      ? 'border-pink-1 bg-pink-1 text-white'
      : 'border-pink-1 bg-transparent text-pink-1';

  const sizeClassName = 'text-base';

  const className = twMerge(
    baseClassName,
    colorClassName,
    sizeClassName,
    cursorClassName,
    _className,
  );

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};
