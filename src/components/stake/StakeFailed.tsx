'use client';

import numeral from 'numeral';

import { Button } from '../button';
import { Logo } from '../logo';
import { Typography } from '../typography';
import { ActionBtnWithWallet } from '../wallet-btns';

interface Props {
  message?: string;
  amount: number;
  onConfirm?: () => void;
}

export const StakeFailed = ({ message = 'Your Claim failed', amount, onConfirm }: Props) => {
  return (
    <div className="pt-2 flex flex-col items-center">
      <Logo
        imageContainerClassName="w-[82px] h-[82px]"
        imageClassName="w-[64px] h-[64px]"
        textClassName="hidden"
      />

      {/* Error */}
      <div className="py-4">
        <Typography color="pink" className="text-center text-2xl text-red-500 italic">
          Oww!
        </Typography>
        <Typography color="pink" className="text-center text-2xl text-red-500 font-bold">
          {message}
        </Typography>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col pt-4 justify-start">
        <div className="grow w-full">
          <Button
            size="medium"
            color="pink"
            className="shadow-xl lg:shadow-none w-full h-12"
            onClick={() => onConfirm && onConfirm()}
          >
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
};
