import { useAccount, useBalance } from 'wagmi';

export const useWallet = () => {
  const { address, chain } = useAccount();

  const { data } = useBalance({
    address,
    chainId: chain?.id,
  });

  return { data, chain };
};
