import { Button, PageContainer, Typography } from '@/components';
import { Home } from '@/sections/home';

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      <PageContainer>
        <Home />
      </PageContainer>
    </div>
  );
}
