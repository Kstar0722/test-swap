import { twMerge } from 'tailwind-merge';

import { Typography } from '@/components';
import { Token } from '@/types';

interface Props {
  token: Token;
  amount?: number;
  className?: string;
  onClick?: () => void;
}

export const TokenItem = ({ token, amount, className, onClick }: Props) => {
  return (
    <div
      className={twMerge('flex flex-row justify-between', className)}
      onClick={() => onClick && onClick()}
    >
      <div className="flex flex-row gap-2">
        <div>
          {token.logoURI && (
            <img
              src={token.logoURI}
              alt={token.name}
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
          )}
        </div>
        <div>
          <Typography color="black">{token.name}</Typography>
          <Typography color="black" className="text-sm text-black/50 leading-none">
            {token.symbol}
          </Typography>
        </div>
      </div>

      {amount && (
        <Typography color="black" className="font-bold text-2xl">
          {amount}
        </Typography>
      )}
    </div>
  );
};
