import { PageContainer } from '@/components';
import { StakePanel } from '@/sections/stake';

export default function StakePage() {
  return (
    <PageContainer className="max-w-3xl">
      <StakePanel step="overall" />
    </PageContainer>
  );
}
