import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type PageContainerProps = PropsWithChildren<{
  className?: string;
}>;

export const PageContainer = ({ children, className = '' }: PageContainerProps) => {
  return <div className={twMerge('container py-12 lg:py-24', className)}>{children}</div>;
};
