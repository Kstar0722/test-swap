'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useConfig } from 'wagmi';
import { getTransactionReceipt } from 'wagmi/actions';

import {
  ActionBtnWithWallet,
  Button,
  StakeConfirmStep,
  StakeFailed,
  StakeInputAmount,
  StakeSuccess,
  Typography,
} from '@/components';
import { useStakeContext } from '@/contexts/StakeContext';
import { BackSvg } from '@/svgs';

interface Props {
  isStake?: boolean;
}

export const StakeNow = ({ isStake = true }: Props) => {
  const {
    stakeInfo: { goodlePrice, balance, stakeShare, totalStaked },
    allowance,
    currentTx,
    txStatus,
    txHash,
    txError,
    approve,
    stake,
    unstake,
    setTxStatus,
    refresh,
  } = useStakeContext();
  const config = useConfig();
  const { address, chainId, isConnected } = useAccount();
  const router = useRouter();
  const [step, setStep] = useState<'stake' | 'confirm' | 'success' | 'error'>('stake');
  const [amount, setAmount] = useState<number | null>(null);
  const [gasFee] = useState<number | null>(12);
  const [pendingTx, setPendingTx] = useState(false);
  const [confirmButtonLabel, setConfirmButtonLabel] = useState(
    isStake ? 'Confirm Stake' : 'Confirm Unstake',
  );

  const handleStaking = (amount: number) => {
    if (!address) {
      toast.error('Please connect wallet again');
      router.push('/stake');
      return;
    }
    if (allowance < amount * 10 ** 18) {
      approve(amount);
    } else {
      stake(amount);
    }
  };

  const handleSubmit = () => {
    if (!amount || pendingTx) {
      return;
    }
    setPendingTx(true);
    if (isStake) {
      handleStaking(amount);
    } else {
      unstake(amount);
    }
  };

  useEffect(() => {
    const fn = async (callback: any) => {
      try {
        await getTransactionReceipt(config, {
          hash: txHash as `0x${string}`,
        });
        callback();
      } catch (e) {
        setTimeout(() => {
          fn(callback);
        }, 1000);
      }
    };
    if (currentTx === 'approve') {
      if (txStatus === 'success') {
        fn(() => {
          stake(amount!);
        });
      } else if (txStatus === 'error') {
        setPendingTx(false);
        setTxStatus('');
        setConfirmButtonLabel(isStake ? 'Confirm Stake' : 'Confirm Unstake');
        toast.error(txError);
      } else if (txStatus === 'pending') {
        setConfirmButtonLabel('Approving token...');
      }
    } else if (currentTx === 'stake' || currentTx === 'unstake') {
      if (txStatus === 'success') {
        fn(() => {
          setStep(txStatus);
          setPendingTx(false);
          setTxStatus('');
          refresh();
        });
      } else if (txStatus === 'error') {
        setPendingTx(false);
        setTxStatus('');
        if (txError.message.includes('Contract Maximum Stake exceeded')) {
          toast.error('You can not stake because stake limited.');
        } else {
          toast.error('Transaction faild');
        }
      } else if (txStatus === 'pending') {
        setConfirmButtonLabel('please wait - confirming transaction...');
      } else {
        setConfirmButtonLabel(isStake ? 'Confirm Stake' : 'Confirm Unstake');
      }
    }
  }, [currentTx, txStatus]);

  return (
    <>
      {/* Top section */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between px-3 gap-2">
        <div className="flex flex-row items-center gap-4">
          <Link href="/stake">
            <BackSvg width={32} height={32} />
          </Link>
          <Typography className="text-2xl font-bold">{isStake ? 'Stake' : 'Unstake'}</Typography>
        </div>
        <div className="flex flex-row items-center gap-4 justify-end sm:justify-start">
          <Link href="/stake/view-stake">
            <Button size="medium" outline={true} className="shadow-xl lg:shadow-none">
              View Stakes
            </Button>
          </Link>
          {isStake ? (
            <Link href="/stake/unstake">
              <Button size="medium" className="shadow-xl lg:shadow-none">
                Unstake
              </Button>
            </Link>
          ) : (
            <Link href="/stake/stake-now">
              <Button size="medium" className="shadow-xl lg:shadow-none">
                Stake Now
              </Button>
            </Link>
          )}
        </div>
      </div>
      {/* Main section */}
      <div className="bg-white rounded-2xl">
        <div className="flex flex-col gap-5 p-4 lg:p-5">
          {step === 'stake' && (
            <StakeInputAmount
              label={isStake ? 'Stake now' : 'Unstake'}
              buttonLabel={isStake ? 'Stake now' : 'Unstake'}
              amount={amount}
              setAmount={setAmount}
              availableAmount={isStake ? balance : stakeShare}
              onSubmit={() => {
                if (!amount) {
                  return;
                }
                setStep('confirm');
              }}
            />
          )}

          {/* Confirm Step */}
          {step === 'confirm' && (
            <StakeConfirmStep
              label={isStake ? 'Confirm Transaction' : 'Confirm Unstake'}
              buttonLabel={confirmButtonLabel}
              amount={amount ?? 0}
              goodlePrice={goodlePrice}
              gasFee={gasFee ?? 0}
              onConfirm={() => handleSubmit()}
            />
          )}

          {/* Success Step */}
          {step === 'success' && (
            <StakeSuccess
              message={isStake ? 'Your Stake is successful' : 'Your Unstake is successful'}
              stakeLabel={isStake ? 'Your Stake' : 'Unstake Amount'}
              amount={amount ?? 0}
              goodlePrice={goodlePrice}
              gasFee={gasFee ?? 0}
            />
          )}

          {/* Error Step */}
          {step === 'error' && (
            <StakeFailed
              message={isStake ? 'Your Stake failed' : 'Your Unstake failed'}
              amount={amount ?? 0}
              onConfirm={() => setStep('stake')}
            />
          )}

          <hr className="border-pink-100 border-2 border-dashed -mx-4 lg:-mx-5" />

          {/* Balance */}
          <div className="flex flex-row justify-center gap-2">
            <Typography className="text-black/50">Total Staked</Typography>
            <Typography color="pink" className="font-bold">
              {numeral(totalStaked).format('0,0.00')}
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
