import { Suspense } from 'react';

export default function SwapLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
