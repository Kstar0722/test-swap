import type { ChainId } from '@lifi/types';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import type { MultisigState } from '@/types/multisig';

export const useMultisigStore = createWithEqualityFn<MultisigState>(
  (set) => ({
    destinationChain: undefined,

    setDestinationChain: (chainId: ChainId) => {
      set({
        destinationChain: chainId,
      });
    },
  }),
  shallow,
);
