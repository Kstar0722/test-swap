import { ethers } from 'ethers';

export enum TransactionState {
  Failed = 'Failed',
  New = 'New',
  Rejected = 'Rejected',
  Sending = 'Sending',
  Sent = 'Sent',
}

const provider = getProvider();
export function getProvider(): ethers.providers.Web3Provider | null {
  try {
    return new ethers.providers.Web3Provider(window?.ethereum, 'any');
  } catch (e) {
    return null;
  }
}

// Transacting with a wallet extension via a Web3 Provider
export async function sendTransaction(
  transaction: ethers.providers.TransactionRequest,
): Promise<TransactionState> {
  try {
    const receipt = await provider?.send('eth_sendTransaction', [transaction]);
    if (receipt) {
      return TransactionState.Sent;
    } else {
      return TransactionState.Failed;
    }
  } catch (e) {
    return TransactionState.Rejected;
  }
}
