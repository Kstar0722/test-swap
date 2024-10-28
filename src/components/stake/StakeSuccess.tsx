'use client';

import numeral from 'numeral';

import { Logo } from '../logo';
import { Typography } from '../typography';
import { ActionBtnWithWallet } from '../wallet-btns';

interface Props {
  message?: string;
  stakeLabel?: string;
  amount: number;
  goodlePrice: number;
  gasFee: number;
}

export const StakeSuccess = ({
  message = 'Your Claim is successful',
  stakeLabel = 'Your Claim',
  amount,
  goodlePrice,
  gasFee,
}: Props) => {
  return (
    <div className="pt-2 flex flex-col items-center">
      <Logo
        imageContainerClassName="w-[82px] h-[82px]"
        imageClassName="w-[64px] h-[64px]"
        textClassName="hidden"
      />

      {/* Success */}
      <div className="py-4">
        <Typography color="pink" className="text-center text-2xl italic">
          Wow!
        </Typography>
        <Typography color="pink" className="text-center text-2xl font-bold">
          {message}
        </Typography>
      </div>

      {/* Your stake */}
      <div className="pt-2 pb-4">
        <Typography color="black" className="text-center">
          {stakeLabel}
        </Typography>
        <div className="flex flex-row flex-wrap items-end pt-2 gap-2">
          <Typography variant="h6" color="pink">
            {numeral(amount).format('0,0.00000')}
          </Typography>
          <Typography variant="h6" color="black" className="font-normal uppercase">
            $Goodle
          </Typography>
          <Typography className="font-normal uppercase text-gray-500/50">
            {numeral((amount ?? 0) * goodlePrice).format('$0,0.0000000') !== '$NaN'
              ? numeral((amount ?? 0) * goodlePrice).format('$0,0.0000000')
              : '$0'}
          </Typography>
        </div>
      </div>
    </div>
  );
};
