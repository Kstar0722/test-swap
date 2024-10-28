'use client';

import Link from 'next/link';
import numeral from 'numeral';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { ActionBtnWithWallet, Button, Typography } from '@/components';
import { useStakeContext } from '@/contexts/StakeContext';
import { BackSvg } from '@/svgs';

import { NoStake } from './NoStake';

export const StakeViews = () => {
  const {
    stakeInfo: { hasStake, goodlePrice, balance, stakeShare, totalStaked },
    setTxStatus,
  } = useStakeContext();
  const { address, chainId } = useAccount();

  useEffect(() => {
    setTxStatus('');
  }, []);

  return (
    <>
      {/* Top section */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between px-3 gap-2">
        <div className="flex flex-row items-center gap-4">
          <Link href="/stake">
            <BackSvg width={32} height={32} />
          </Link>
          <Typography className="text-2xl font-bold">My Stake</Typography>
        </div>
        <div className="flex flex-row items-center gap-4 justify-end sm:justify-start">
          <Link href="/stake/stake-now">
            <Button size="medium" className="shadow-xl lg:shadow-none">
              Stake More
            </Button>
          </Link>
        </div>
      </div>
      {/* Main section */}
      <div className="bg-white rounded-2xl">
        <div className="flex flex-col gap-5 p-4 lg:p-5">
          {!hasStake ? (
            <NoStake />
          ) : (
            <>
              {/* Your stake */}
              <div className="pt-2">
                <Typography color="black">Total Stake</Typography>
                <div className="flex flex-row flex-wrap items-center pt-2 gap-2">
                  <Typography variant="h6" color="pink">
                    {numeral(totalStaked).format('0,0')}
                  </Typography>
                  <Typography variant="h6" color="black" className="font-normal uppercase">
                    $Goodle
                  </Typography>
                  <Typography className="font-normal uppercase text-gray-500/50 mt-1">
                    ~ {numeral(totalStaked * goodlePrice).format('$0,0.00000')}
                  </Typography>
                </div>
              </div>

              {/* Stake Share */}
              <div className="pt-2">
                <Typography color="black">Your stake share</Typography>
                <div className="flex flex-row flex-wrap items-end pt-2 gap-2">
                  <Typography variant="h6" color="pink">
                    {address ? numeral(stakeShare).format('0,0') : 0}
                  </Typography>
                  <Typography variant="h6" color="black" className="font-normal uppercase">
                    $GOODLE
                  </Typography>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:grid grid-col-1 sm:grid-cols-2 gap-4 sm:gap-6 mx-auto py-2 justify-start">
                <div className="grow">
                  <Link href="/stake/daily-rewards" className="block w-full">
                    <Button
                      color="pink"
                      size="medium"
                      className="shadow-xl h-12 lg:shadow-none w-full"
                    >
                      Claim daily rewards
                    </Button>
                  </Link>
                </div>
                <div className="grow">
                  <Link href="/stake/unstake">
                    <Button
                      size="medium"
                      color="pink"
                      outline
                      className="shadow-xl h-12 lg:shadow-none w-full"
                    >
                      Unstake
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}

          <hr className="border-pink-100 border-2 border-dashed -mx-4 lg:-mx-5" />

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
