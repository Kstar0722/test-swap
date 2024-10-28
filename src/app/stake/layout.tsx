import { StakeContextProvider } from '@/contexts/StakeContext';

export default function StakeLayout({ children }: { children: React.ReactNode }) {
  return <StakeContextProvider>{children}</StakeContextProvider>;
}
