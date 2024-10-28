import Link from 'next/link';
import numeral from 'numeral';
import { base } from 'viem/chains';
import { useAccount, useSwitchChain } from 'wagmi';

import { Button, Logo, Typography } from '@/components';
import { useStakeContext } from '@/contexts/StakeContext';

export const NoStake = () => {
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  return (
    <section className="flex flex-col pt-10 items-center">
      <Logo
        imageContainerClassName="w-[82px] h-[82px]"
        imageClassName="w-[64px] h-[64px]"
        textClassName="hidden"
      />
      <Typography color="black" className="text-2xl mt-6">
        No stakes yet.
      </Typography>
      <Typography className="text-2xl text-black/50 mt-2 text-center">
        Deposit your first stake to earn rewards
      </Typography>
      {chainId === base.id ? (
        <Link href="/stake/stake-now">
          <Button color="pink" size="large" className="shadow-xl lg:shadow-none my-10">
            Stake Now
          </Button>
        </Link>
      ) : (
        <Button
          color="pink"
          size="large"
          className="shadow-xl lg:shadow-none my-10 text-lg sm:text-xl"
          onClick={() => switchChain({ chainId: base.id })}
        >
          Switch to Base Network
        </Button>
      )}
    </section>
  );
};
