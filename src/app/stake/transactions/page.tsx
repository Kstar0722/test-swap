import { PageContainer } from '@/components';
import { StakeTransactions } from '@/sections/stake';

export default function StakeTransactionsPage() {
  return (
    <PageContainer className="container-2xl py-6 lg:pt-10 lg:pb-6">
      <StakeTransactions />
    </PageContainer>
  );
}
