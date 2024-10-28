import { TableHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TrProps = TableHTMLAttributes<HTMLTableRowElement>;

export const Tr = ({ className: _className, ...rest }: TrProps) => {
  const baseClassName = '';

  const className = twMerge(baseClassName, _className);

  return <tr className={className} {...rest} />;
};
