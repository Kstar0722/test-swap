'use client';

import numeral from 'numeral';
import { useEffect, useState } from 'react';

import { Typography } from '../typography';
import { ActionBtnWithWallet } from '../wallet-btns';

interface Props {
  label: string;
  buttonLabel: string;
  amount: number;
  goodlePrice: number;
  gasFee: number;
  onConfirm: () => void;
}

export const StakeConfirmStep = ({
  label,
  buttonLabel,
  amount,
  goodlePrice,
  gasFee,
  onConfirm,
}: Props) => {
  return (
    <div className="pt-2">
      <Typography color="black" className="font-bold">
        {label}
      </Typography>

      {/* Your stake */}
      <div className="pt-2 pb-4">
        <Typography color="black">Your amount</Typography>
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
      <div className="pt-2 pb-4">
        <div className="flex flex-row flex-wrap items-end pt-2 gap-2">
          <Typography color="black">Fee 0.3% = </Typography>
          <Typography color="pink">{numeral(amount * 0.997).format('0,0.00000')}</Typography>
          <Typography color="black" className="font-normal uppercase">
            $Goodle
          </Typography>
          <Typography className="font-normal uppercase text-gray-500/50">
            {numeral(amount * 0.997 * goodlePrice).format('$0,0.0000000') !== '$NaN'
              ? numeral(amount * 0.997 * goodlePrice).format('$0,0.0000000')
              : '$0'}
          </Typography>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col pt-4 justify-start">
        <div className="grow w-full">
          <ActionBtnWithWallet
            buttonLabel={buttonLabel}
            className="w-full px-8 h-[48px]"
            onClick={() => onConfirm()}
            disabled={!amount || amount === 0}
          />
        </div>
      </div>
    </div>
  );
};
