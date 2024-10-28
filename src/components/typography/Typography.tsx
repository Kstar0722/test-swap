import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption';

type TypographyProps = PropsWithChildren<{
  variant?: Variant;
  color?: 'white' | 'pink' | 'yellow' | 'black';
  className?: string;
  id?: string;
}>;

export const Typography = ({
  children,
  variant = 'p',
  color = 'white',
  className: _className = '',
  id = '',
}: TypographyProps) => {
  const baseClass = 'transition-all';

  const colorClass =
    color === 'pink'
      ? 'text-pink-1'
      : color === 'yellow'
        ? 'text-yellow-1'
        : color === 'black'
          ? 'text-gray-700'
          : 'text-white';

  const h1Class = 'text-[48px] lg:text-[120px] font-bold leading-[100%]';

  const h2Class = 'text-[44px] lg:text-[100px] font-bold leading-[100%]';

  const h3Class = 'text-[40px] lg:text-[80px] font-bold leading-[100%]';

  const h4Class = 'text-[36px] lg:text-[60px] font-bold leading-[100%]';

  const h5Class = 'text-[32px] lg:text-[48px] font-bold leading-[100%]';

  const h6Class = 'text-[28px] lg:text-[32px] font-bold leading-[100%]';

  const captionClass = 'text-base leading-[100%]';

  const pClass = 'text-lg leading-[150%]';

  const getVariantClass = (_variant: Variant) => {
    switch (_variant) {
      case 'h1': {
        return h1Class;
      }

      case 'h2': {
        return h2Class;
      }

      case 'h3': {
        return h3Class;
      }

      case 'h4': {
        return h4Class;
      }

      case 'h5': {
        return h5Class;
      }

      case 'h6': {
        return h6Class;
      }

      case 'caption': {
        return captionClass;
      }

      default: {
        return pClass;
      }
    }
  };

  const variantClass = getVariantClass(variant);

  const className = twMerge(baseClass, colorClass, variantClass, _className);

  if (variant === 'h1') {
    return (
      <h1 id={id} className={className}>
        {children}
      </h1>
    );
  }

  if (variant === 'h2') {
    return (
      <h2 id={id} className={className}>
        {children}
      </h2>
    );
  }

  if (variant === 'h3') {
    return (
      <h3 id={id} className={className}>
        {children}
      </h3>
    );
  }

  if (variant === 'h4') {
    return (
      <h4 id={id} className={className}>
        {children}
      </h4>
    );
  }

  if (variant === 'h5') {
    return (
      <h5 id={id} className={className}>
        {children}
      </h5>
    );
  }

  if (variant === 'h6') {
    return (
      <h6 id={id} className={className}>
        {children}
      </h6>
    );
  }

  return (
    <p id={id} className={className}>
      {children}
    </p>
  );
};
