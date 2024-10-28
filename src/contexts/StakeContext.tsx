'use client';

import _ from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';
import { createPublicClient, http, parseGwei } from 'viem';
import { base, mainnet } from 'viem/chains';
import {
  UseBalanceReturnType,
  UseReadContractReturnType,
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from 'wagmi';

import GOODLE_TOKEN_ABI from '@/abis/GoodleToken.json';
import STAKE_CONTRACT_ABI from '@/abis/StakeGoodleToken.json';
import { getGoodleTokenAddress, getStakingContractAddress } from '@/configs';

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export type StakeInfoType = {
  hasStake: boolean;
  goodlePrice: number;
  totalStakedOfAddress: number;
  balance: number;
  totalStaked: number;
  rewards: number;
  dailyReward: number;
  stakeShare: number;
  transactions: {
    date: string;
    source: string;
    destination: string;
    sourceTransaction: string;
    destinationTransaction: string;
    status: string;
  }[];
};

export type StakeContextType = {
  stakeInfo: StakeInfoType;
  allowance: number;
  txStatus: string;
  currentTx: string;
  txHash: `0x${string}` | undefined;
  txError: any;
  calcRewards: () => number;
  approve: (amount: number) => void;
  stake: (amount: number) => void;
  unstake: (amount: number) => void;
  claim: () => void;
  setTxStatus: (status: string) => void;
  refresh: () => void;
};

const defaultValues: StakeInfoType = {
  hasStake: false,
  goodlePrice: 0,
  totalStakedOfAddress: 0,
  balance: 0,
  rewards: 0,
  dailyReward: 0,
  stakeShare: 0,
  totalStaked: 0,
  transactions: _.range(1, 11).map((index: number) => ({
    date: '09/12/2024',
    source: '0x1fd6cA086cA06cA0',
    destination: '0x7fd6cA086cA06cA0',
    sourceTransaction: 'XXXXX-XXXX',
    destinationTransaction: 'XXXXX-XXXX',
    status: 'Success',
  })),
};

const StakeContext = createContext<StakeContextType>({
  stakeInfo: defaultValues,
  allowance: 0,
  currentTx: '',
  txStatus: '',
  txHash: undefined,
  txError: null,
  calcRewards: () => {
    return 0;
  },
  approve: () => {},
  stake: () => {},
  unstake: () => {},
  claim: () => {},
  setTxStatus: () => {},
  refresh: () => {},
});

export const useStakeContext = (): StakeContextType => useContext(StakeContext);

/* Context provider */
export const StakeContextProvider = (props: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const { address, chainId, status: accountStaus } = useAccount();
  const { writeContract, status, error, data } = useWriteContract();
  // const {data} = useReadContract();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [currentTx, setCurrentTx] = useState('');
  const [txStatus, setTxStatus] = useState('');
  const token = getGoodleTokenAddress(chainId);
  const contract = getStakingContractAddress(chainId);
  const balance: UseBalanceReturnType = useBalance({
    address,
    token,
    chainId,
  });
  const [stakeInfo, setStakeInfo] = useState();
  const [allowance, setAllowance] = useState();
  const [totalStaked, setTotalStaked] = useState();
  const [totalStakedOfAddress, setTotalStakedOfAddress] = useState();

  const approve = (amount: number) => {
    setCurrentTx('approve');
    setTxStatus('');
    const largeNumber = BigInt(amount) * BigInt(10 ** 18);
    const largeNumberString = largeNumber.toString();

    writeContract({
      abi: GOODLE_TOKEN_ABI as any,
      address: token,
      functionName: 'approve',
      args: [contract, largeNumberString],
      gas: parseGwei('0.001'),
    });
  };

  const stake = (amount: number) => {
    setCurrentTx('stake');
    setTxStatus('');
    const largeNumber = BigInt(amount) * BigInt(10 ** 18);
    const largeNumberString = largeNumber.toString();
    writeContract({
      abi: STAKE_CONTRACT_ABI as any,
      address: contract,
      functionName: 'stake',
      args: [largeNumberString],
      gas: parseGwei('0.001'),
    });
    refresh();
  };

  const unstake = (amount: number) => {
    setCurrentTx('unstake');
    setTxStatus('');
    const largeNumber = BigInt(amount) * BigInt(10 ** 18);
    const largeNumberString = largeNumber.toString();
    writeContract({
      abi: STAKE_CONTRACT_ABI as any,
      address: contract,
      functionName: 'unstake',
      args: [largeNumberString],
      gas: parseGwei('0.001'),
    });
    refresh();
  };

  const claim = () => {
    setCurrentTx('claim');
    setTxStatus('');
    writeContract({
      abi: STAKE_CONTRACT_ABI as any,
      address: contract,
      functionName: 'claim',
      args: [],
      gas: parseGwei('0.001'),
    });
    refresh();
  };
  const [stakeInfoValues, setStakeInfoValues] = useState<StakeInfoType>(defaultValues);
  const [allowanceValue, setAllowanceValue] = useState<number>(0);

  const refresh = async () => {
    await balance.refetch();
    const [stakeInfo, allowance, totalStaked, totalStakedOfAddress]: any = await Promise.all([
      publicClient.readContract({
        abi: STAKE_CONTRACT_ABI as any,
        address: contract,
        functionName: 'getStakeInfo',
        args: [address || '0x0'],
      }),
      publicClient.readContract({
        abi: GOODLE_TOKEN_ABI as any,
        address: token,
        functionName: 'allowance',
        args: [address || '0x0', contract],
      }),
      publicClient.readContract({
        abi: STAKE_CONTRACT_ABI as any,
        address: contract,
        functionName: 'getTotalStaked',
        args: [],
      }),
      publicClient.readContract({
        abi: STAKE_CONTRACT_ABI as any,
        address: contract,
        functionName: 'getTokensStaked',
        args: [address || '0x0'],
      }),
    ]);
    setStakeInfo(stakeInfo);
    setAllowance(allowance);
    setTotalStaked(totalStaked);
    setTotalStakedOfAddress(totalStakedOfAddress);
  };

  const calcRewards = () => {
    // const data: any = stakeInfo.data;
    if (stakeInfo) {
      const now = Number(Math.floor(new Date().getTime() / 1000));

      const stakedAmount = Number(stakeInfo[0]);
      const unclaimedAmount = Number(stakeInfo[1]);
      const lastClaimedTime = Number(stakeInfo[2]);
      const rate = Number(0.05);
      const decimal = Number(10 ** 18);

      return (
        (unclaimedAmount +
          (stakedAmount * rate * (now - lastClaimedTime)) / Number(365 * 24 * 60 * 60)) /
        decimal
      );
    } else {
      return 0;
    }
  };
  useEffect(() => {
    if (address && accountStaus === 'connected') {
      refresh();
    }
  }, [address, chainId, accountStaus]);

  useEffect(() => {
    setStakeInfoValues((prevState) => ({
      ...prevState,
      balance: Number(balance.data?.formatted || 0),
    }));
  }, [balance.data?.value]);

  useEffect(() => {
    setAllowanceValue(Number(allowance));
  }, [allowance]);

  useEffect(() => {
    setStakeInfoValues((prevState) => ({
      ...prevState,
      totalStaked: Number(totalStaked) / 10 ** 18,
    }));
  }, [totalStaked]);
  useEffect(() => {
    setStakeInfoValues((prevState) => ({
      ...prevState,
      totalStakedOfAddress: Number(totalStakedOfAddress) / 10 ** 18,
    }));
  }, [totalStakedOfAddress]);

  useEffect(() => {
    if (stakeInfo) {
      const data: any = stakeInfo;
      if (data) {
        const stakedAmount = Number(data[0]);
        const rate = Number(0.05);
        const decimal = Number(10 ** 18);
        const rewards = calcRewards();
        setStakeInfoValues((prevState) => ({
          ...prevState,
          hasStake: stakedAmount > 0,
          stakeShare: stakedAmount / decimal,
          rewards,
          dailyReward: (stakedAmount * rate) / Number(365 * 24 * 60 * 60) / decimal,
        }));
      }
    }
  }, [stakeInfo]);

  useEffect(() => {
    setTxStatus(status);
  }, [status]);

  useEffect(() => {
    setTxHash(data);
  }, [data]);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setCount(count + 1);
      const rewards = calcRewards();
      setStakeInfoValues((prevState) => ({
        ...prevState,
        rewards,
      }));
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/agent/web3/token-price?address=${process.env.NEXT_PUBLIC_GOODLE_TOKEN_ADDRESS_BASE}&decimals=18`,
        );
        const priceInfo = await data.json();
        const price = priceInfo.usdt;
        setStakeInfoValues((prev) => ({
          ...prev,
          goodlePrice: price,
        }));
      } catch (e) {}
    })();
  }, []);

  return (
    <StakeContext.Provider
      value={{
        stakeInfo: stakeInfoValues,
        allowance: allowanceValue,
        txStatus,
        txHash,
        currentTx,
        txError: error,
        calcRewards,
        approve,
        stake,
        unstake,
        claim,
        setTxStatus,
        refresh,
      }}
    >
      {props.children}
    </StakeContext.Provider>
  );
};
