'use client';

import { Button, Typography } from '@/components';

interface Props {
  buttonLabel?: string;
}

export const BridgeWalletBtn = ({ buttonLabel }: Props) => {
  return <Button color="pink">Connect Wallet</Button>;
};
