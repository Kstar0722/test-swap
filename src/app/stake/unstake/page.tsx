import { PageContainer } from '@/components';
import { StakePanel } from '@/sections/stake';

export default function UnstakePage() {
  return (
    <PageContainer className="max-w-3xl">
      <StakePanel step="unstake" />
    </PageContainer>
  );
}
