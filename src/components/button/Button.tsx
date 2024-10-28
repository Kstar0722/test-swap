import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'medium' | 'large';
  color?: 'yellow' | 'pink';
  outline?: boolean;
  disabled?: boolean;
};

export const Button = ({
  size = 'medium',
  color = 'yellow',
  className: _className = '',
  outline = false,
  disabled = false,
  ...rest
}: ButtonProps) => {
  const baseClassName =
    'inline-flex items-center justify-center gap-2 rounded-xl transition-all outline-none';

  const colorClassName =
    color === 'pink'
      ? !outline
        ? 'bg-pink-1 hover:bg-pink-2 text-white hover:text-yellow-2'
        : 'border-2 border-pink-2 hover:border-pink-1 text-pink-1 hover:text-pink-1'
      : !outline
        ? 'bg-yellow-1 hover:bg-yellow-2 text-pink-1 hover:text-black'
        : 'border-2 border-yellow-2 hover:border-yellow-1 text-yellow-1 hover:text-yellow-1';

  const sizeClassName =
    size === 'large'
      ? 'min-h-[60px] text-2xl px-8 font-bold'
      : 'min-h-10 text-base px-4 font-semibold';

  const className = twMerge(
    baseClassName,
    colorClassName,
    sizeClassName,
    _className,
    disabled && 'opacity-30',
  );

  return <button className={className} {...rest} />;
};
