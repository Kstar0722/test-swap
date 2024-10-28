'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

import {
  ActionBtnWithWallet,
  Button,
  Logo,
  StakeConfirmStep,
  StakeFailed,
  StakeInputAmount,
  StakeSuccess,
  Typography,
} from '@/components';
import { useStakeContext } from '@/contexts/StakeContext';
import { BackSvg, CloseSvg } from '@/svgs';

export const StakeDaily = () => {
  const {
    stakeInfo: { rewards, goodlePrice },
    txStatus,
    calcRewards,
    setTxStatus,
    claim,
  } = useStakeContext();
  const { address, chainId, isConnected } = useAccount();
  const router = useRouter();

  const [step, setStep] = useState<'overview' | 'claim' | 'confirm' | 'success' | 'error'>(
    'overview',
  );
  useEffect(() => {
    setTxStatus('');
  }, []);
  const [amount, setAmount] = useState<number | null>(null);
  const [claimedAmount, setClaimedAmount] = useState<number>(0);
  const [gasFee] = useState<number | null>(12);

  const [isProcessingTx, setIsProcessingTx] = useState(false);
  const handleClaim = () => {
    if (!address) {
      toast.error('Please connect wallet again');
      router.push('/stake');
      return;
    }
    if (isProcessingTx) {
      return;
    }

    claim();
    setClaimedAmount(calcRewards());
  };

  useEffect(() => {
    if (txStatus === 'success' || txStatus === 'error') {
      setIsProcessingTx(false);
      setStep(txStatus);
    }
  }, [txStatus]);
  return (
    <>
      {/* Top section */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between px-3 gap-2">
        <div className="flex flex-row items-center gap-4">
          <Link href="/stake" className="text-white">
            {step !== 'success' && step !== 'error' ? (
              <BackSvg width={32} height={32} />
            ) : (
              <CloseSvg width={32} height={32} />
            )}
          </Link>
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
          {/* Overview Step */}
          {step === 'overview' && (
            <>
              {/* Daily Reward */}
              <div className="pt-2">
                <Typography color="black">Daily Rewards</Typography>
                <div className="flex flex-row flex-wrap items-end pt-2 gap-2">
                  <Typography variant="h6" color="pink">
                    {rewards > 0.000001 ? numeral(rewards).format('0,0.00000') : 0}
                  </Typography>
                  <Typography variant="h6" color="black" className="font-normal uppercase">
                    $Goodle
                  </Typography>
                  <Typography className="font-normal uppercase text-gray-500/50">
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
                  <ActionBtnWithWallet
                    buttonLabel="Claim now"
                    className="w-full px-8 h-[48px]"
                    onClick={() => setStep('confirm')}
                  />
                </div>
              </div>
            </>
          )}
          {/* Claim Step */}
          {step === 'claim' && (
            <StakeInputAmount
              label="Claim Rewards"
              buttonLabel="Claim now"
              amount={amount}
              setAmount={setAmount}
              availableAmount={rewards}
              onSubmit={() => setStep('confirm')}
            />
          )}
          {/* Confirm Step */}
          {step === 'confirm' && (
            <StakeConfirmStep
              label="Confirm Claim Transaction"
              buttonLabel="Confirm Reward Claim"
              amount={rewards}
              goodlePrice={goodlePrice}
              gasFee={gasFee ?? 0}
              onConfirm={() => handleClaim()}
            />
          )}
          {/* Success Step */}
          {step === 'success' && (
            <StakeSuccess
              message="Your Claim is successful"
              stakeLabel="Your Claim"
              amount={claimedAmount ?? 0}
              goodlePrice={goodlePrice}
              gasFee={gasFee ?? 0}
            />
          )}
          {/* Error Step */}
          {step === 'error' && (
            <StakeFailed
              message="Your Claim failed"
              amount={amount ?? 0}
              onConfirm={() => setStep('overview')}
            />
          )}
          <hr className="border-gray-100 border-2 border-dashed -mx-4 lg:-mx-5" />
          {/* Balance */}
          <div className="flex flex-row justify-center gap-2">
            <Typography className="text-black/50">Your daily reward</Typography>
            <Typography color="pink" className="font-bold">
              {rewards > 0.000001 ? numeral(rewards).format('0,0.00000') : 0}
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
