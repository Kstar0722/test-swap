'use client';

import { Button } from '@/components';

interface Props {
  onClick?: () => void;
}

export const IssueWalletBtn = ({ onClick }: Props) => {
  return <Button color="pink">Connect Wallet</Button>;
};
