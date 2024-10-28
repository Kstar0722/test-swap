import { PageContainer } from '@/components';
import { StakePanel } from '@/sections/stake';

export default function StakeDailyRewardsPage() {
  return (
    <PageContainer className="max-w-3xl">
      <StakePanel step="daily-rewards" />
    </PageContainer>
  );
}
