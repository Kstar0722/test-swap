import { TableHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TableProps = TableHTMLAttributes<HTMLTableElement>;

export const Table = ({ className: _className, ...rest }: TableProps) => {
  const baseClassName = 'w-full';

  const className = twMerge(baseClassName, _className);

  return <table className={className} {...rest} />;
};
