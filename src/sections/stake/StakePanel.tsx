'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { base } from 'viem/chains';
import { useAccount, useSwitchChain } from 'wagmi';

import { Typography } from '@/components';

import { StakeDaily, StakeNow, StakeOverall, StakeViews } from './partials';

interface Props {
  step: 'overall' | 'view-stake' | 'stake' | 'unstake' | 'daily-rewards';
}

export const StakePanel = ({ step }: Props) => {
  const { switchChainAsync } = useSwitchChain();
  const { address, chainId, isConnected } = useAccount();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const switchNetwork = async () => {
      if (isConnected && chainId !== base.id) {
        try {
          await switchChainAsync({ chainId: base.id });
        } catch (error) {
          console.error('Failed to add Base network', error);
        }
      }
    };

    switchNetwork();
  }, [path, chainId, address, isConnected, switchChainAsync]);

  return (
    <>
      <>
        {step === 'overall' && <StakeOverall />}
        {step === 'view-stake' && <StakeViews />}
        {step === 'daily-rewards' && <StakeDaily />}
        {step === 'stake' && <StakeNow />}
        {step === 'unstake' && <StakeNow isStake={false} />}
      </>

      <div className="pl-0 md:pl-16 lg:pl-[100px] mt-8 md:mt-12">
        <Typography>1. 5% Rewards annually - Claim rewards everyday</Typography>
        <Typography>2. Bonus Program - Capped at 10 Billion GOODLE</Typography>
      </div>
    </>
  );
};
