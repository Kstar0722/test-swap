'use client';

import Link from 'next/link';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { Button, Typography } from '@/components';
import { useStakeContext } from '@/contexts/StakeContext';

import { NoStake } from './NoStake';

export const StakeOverall = () => {
  const {
    stakeInfo: { hasStake, balance, stakeShare, goodlePrice, rewards },
    txStatus,
  } = useStakeContext();
  const { address, chainId, isConnected } = useAccount();
  const [hasStaked, setHasStaked] = useState(hasStake);
  const [isProcessingTx, setIsProcessingTx] = useState(false);

  useEffect(() => {
    if (address && chainId === 8453 && isConnected) {
      setHasStaked(true);
    } else {
      setHasStaked(false);
    }
  }, [address, chainId, isConnected]);
  useEffect(() => {
    if (txStatus === 'success' || txStatus === 'error') {
      setIsProcessingTx(false);
    }
  }, [txStatus]);
  return (
    <>
      {/* Top section */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between px-3 gap-2">
        <div className="flex flex-row items-center gap-4">
          <Typography className="text-2xl font-bold">Stake</Typography>
        </div>
        <div className="flex flex-row items-center gap-4 justify-end sm:justify-start">
          <Link href="/stake/view-stake">
            <Button size="medium" outline={true} className="shadow-xl lg:shadow-none">
              View Stakes
            </Button>
          </Link>
          <Link href="/stake/stake-now">
            <Button size="medium" className="shadow-xl lg:shadow-none">
              Stake Now
            </Button>
          </Link>
        </div>
      </div>
      {/* Main section */}
      <div className="bg-white rounded-2xl">
        <div className="flex flex-col gap-5 p-4 lg:p-5">
          {!hasStaked ? (
            <NoStake />
          ) : (
            <>
              {/* Your stake */}
              <div className="pt-2">
                <Typography color="black">Your stake</Typography>
                <div className="flex flex-row flex-wrap items-center pt-2 gap-2">
                  <Typography variant="h6" color="pink">
                    {rewards > 0.000001 ? numeral(stakeShare).format('0,0.0') : 0}
                  </Typography>

                  <Typography variant="h6" color="black" className="font-normal uppercase">
                    $Goodle
                  </Typography>
                  <Typography className="font-normal uppercase text-gray-500/50 mt-1">
                    ~{' '}
                    {numeral(stakeShare * goodlePrice).format('$0,0.0000000') !== '$NaN'
                      ? numeral(stakeShare * goodlePrice).format('$0,0.0000000')
                      : '$0'}
                  </Typography>
                </div>
              </div>

              {/* Reward */}
              <div className="pt-2">
                <Typography color="black">Rewards</Typography>
                <div className="flex flex-row flex-wrap items-center pt-2 gap-2">
                  <Typography variant="h6" color="pink" className="bg-yellow-300 p-2.5 rounded-lg">
                    {rewards > 0.000001 ? numeral(rewards).format('0,0.00000') : 0}
                  </Typography>
                  <Typography variant="h6" color="black" className="font-normal uppercase">
                    $Goodle
                  </Typography>
                  <Typography className="font-normal uppercase text-gray-500/50 mt-1">
                    ~{' '}
                    {numeral(rewards * goodlePrice).format('$0,0.0000000') !== '$NaN'
                      ? numeral(rewards * goodlePrice).format('$0,0.0000000')
                      : '$0'}
                  </Typography>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:grid grid-col-1 sm:grid-cols-2 gap-4 sm:gap-6 mx-auto py-2 justify-start">
                <div className="grow">
                  <Link href="/stake/daily-rewards">
                    <Button
                      color="pink"
                      size="medium"
                      className="shadow-xl lg:shadow-none w-full h-12"
                    >
                      Claim daily rewards
                    </Button>
                  </Link>
                </div>
                <div className="grow">
                  <Link href="/stake/unstake">
                    <Button
                      color="pink"
                      outline={true}
                      size="medium"
                      className="shadow-xl lg:shadow-none w-full h-12"
                    >
                      Unstake
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}

          <hr className="border-gray-100 border-2 border-dashed -mx-4 lg:-mx-5" />

          {/* Balance */}
          <div className="flex flex-row justify-center gap-2">
            <Typography className="text-black/50">Your balance</Typography>
            <Typography color="pink" className="font-bold">
              {numeral(balance).format('0,0')}
            </Typography>
            <Typography color="black" className="uppercase">
              $GOODLE
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
