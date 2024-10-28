import { PageContainer } from '@/components';
import { StakePanel } from '@/sections/stake';

export default function StakeViewPage() {
  return (
    <PageContainer className="max-w-3xl">
      <StakePanel step="view-stake" />
    </PageContainer>
  );
}
