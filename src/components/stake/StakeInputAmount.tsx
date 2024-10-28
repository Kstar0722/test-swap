'use client';

import { useEffect, useState } from 'react';

import { Input } from '../input';
import { TabSelector } from '../tab-selector';
import { Typography } from '../typography';
import { ActionBtnWithWallet } from '../wallet-btns';

interface Props {
  label: string;
  buttonLabel: string;
  amount: number | null;
  availableAmount: number;
  setAmount: (amount: number | null) => void;
  onSubmit: () => void;
}

export const StakeInputAmount = ({
  label,
  buttonLabel,
  amount,
  setAmount,
  availableAmount,
  onSubmit,
}: Props) => {
  const [amountPer, setAmountPer] = useState<number | null>(null);

  useEffect(() => {
    if (amountPer !== null) {
      setAmount(Math.floor(Math.floor((availableAmount * amountPer * 10 ** 7) / 100) / 10 ** 7));
    }
  }, [amountPer]);

  return (
    <div className="pt-2">
      <Typography color="black" className="font-bold">
        {label}
      </Typography>
      <div className="mt-4">
        <Input
          label="Enter amount"
          inputProps={{
            type: 'number',
            value: amount ?? '',
            onChange: (evt) => {
              const value = evt.target.value;
              setAmount(parseFloat(value));
            },
            placeholder: '0.0',
          }}
          endIcon={
            <Typography color="black" className="uppercase pl-4 text-2xl">
              $GOODLE
            </Typography>
          }
        />
      </div>
      {amount && (amount > availableAmount || amount <= 0) ? (
        <Typography className="text-red-500 mt-2 text-sm">This amount is not available!</Typography>
      ) : null}
      <div className="mt-4">
        <TabSelector
          value={amountPer}
          setValue={setAmountPer}
          data={[
            { label: '25%', value: 25 },
            { label: '50%', value: 50 },
            { label: '75%', value: 75 },
            { label: 'Max', value: 100 },
          ]}
        />
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col pt-4 justify-start">
        <div className="grow w-full">
          <ActionBtnWithWallet
            buttonLabel={buttonLabel}
            className="w-full px-8 h-[48px]"
            onClick={
              !amount || amount <= 0 || amount > availableAmount ? () => {} : () => onSubmit()
            }
            disabled={!amount || amount <= 0 || amount > availableAmount}
          />
        </div>
      </div>
    </div>
  );
};
