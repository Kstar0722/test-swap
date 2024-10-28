export interface SuperfestNFTStoreProps {
  address?: string;
  claimInfo?: {
    [key: string]: any;
  };
  timestamp: number;
}

export interface SuperfestNFTState extends SuperfestNFTStoreProps {
  setNFTCheckData: (
    address: string,
    claimInfo: {
      [key: string]: any;
    },
    time: number,
  ) => void;
}
