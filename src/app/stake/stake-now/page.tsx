import { PageContainer } from '@/components';
import { StakePanel } from '@/sections/stake';

export default function StakeNowPage() {
  return (
    <PageContainer className="max-w-3xl">
      <StakePanel step="stake" />
    </PageContainer>
  );
}
