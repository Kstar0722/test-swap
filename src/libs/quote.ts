import { Token } from '@uniswap/sdk-core';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json';
import { FeeAmount, computePoolAddress } from '@uniswap/v3-sdk';
import { ethers } from 'ethers';

import { getUniswapFactoryContractAddress, getUniswapQuoteContractAddress } from '@/configs';

import { fromReadableAmount, toReadableAmount } from '../libs/conversion';
import { getProvider } from './providers';

export async function quote(
  inToken: Token,
  outToken: Token,
  amountIn: number,
  chainId: number,
): Promise<string> {
  const provider = getProvider();
  if (!provider || inToken.address === outToken.address) {
    return '0';
  }

  const quoterContract = new ethers.Contract(
    getUniswapQuoteContractAddress(chainId),
    Quoter.abi,
    provider,
  );
  const poolConstants = await getPoolConstants(inToken, outToken, chainId);

  try {
    if (inToken.address > outToken.address) {
      const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle({
        tokenIn: poolConstants.token1,
        tokenOut: poolConstants.token0,
        amountIn: fromReadableAmount(amountIn, inToken.decimals).toString(),
        fee: poolConstants.fee,
        sqrtPriceLimitX96: 0,
      });

      return toReadableAmount(quotedAmountOut.amountOut, outToken.decimals);
    } else {
      const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle({
        tokenIn: poolConstants.token0,
        tokenOut: poolConstants.token1,
        amountIn: fromReadableAmount(amountIn, inToken.decimals).toString(),
        fee: poolConstants.fee,
        sqrtPriceLimitX96: 0,
      });

      return toReadableAmount(quotedAmountOut.amountOut, outToken.decimals);
    }
  } catch (e) {
    return '0';
  }
}

async function getPoolConstants(
  inToken: Token,
  outToken: Token,
  chainId: number,
): Promise<{
  token0: string;
  token1: string;
  fee: number;
}> {
  const provider = getProvider();
  if (!provider) {
    return {
      token0: '0x0',
      token1: '0x0',
      fee: FeeAmount.HIGH,
    };
  }
  const currentPoolAddress = computePoolAddress({
    factoryAddress: getUniswapFactoryContractAddress(chainId),
    tokenA: inToken,
    tokenB: outToken,
    fee: FeeAmount.HIGH,
    chainId,
  });

  const poolContract = new ethers.Contract(currentPoolAddress, IUniswapV3PoolABI.abi, provider);
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  return {
    token0,
    token1,
    fee,
  };
}
