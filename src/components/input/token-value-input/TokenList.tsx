import _ from 'lodash';
import ContentLoader from 'react-content-loader';

import { TokenItem } from '@/components';
import { Token } from '@/types';

interface Props {
  tokens: Token[];
  isLoading?: boolean;
  itemClassName?: string;
  onItemClick?: (token: Token) => void;
  showAmount?: boolean;
}

export const TokenList = ({
  tokens,
  isLoading,
  itemClassName,
  onItemClick,
  showAmount = false,
}: Props) => {
  return (
    <>
      {isLoading && <TokenListSkeleton showAmount={showAmount} />}
      {!isLoading &&
        (tokens ?? []).map((token, index) => (
          <TokenItem
            key={`${token.address}-${index}`}
            token={token}
            amount={showAmount ? 0.99 : undefined}
            className={itemClassName}
            onClick={() => onItemClick && onItemClick(token)}
          />
        ))}
    </>
  );
};

const TokenListSkeleton = ({ showAmount }: { showAmount: boolean }) => {
  return (
    <>
      {_.range(0, 6).map((index) => (
        <div key={index} className="flex flex-row justify-between">
          <div className="grow">
            <ContentLoader
              key={index}
              speed={2}
              width={'80%'}
              height={40}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              {/* Title */}
              <rect x="48" y="0" rx="3" ry="3" width={70 + _.random(20, false)} height="20" />
              {/* Symbol */}
              <rect x="48" y="24" rx="3" ry="3" width={52 + _.random(20, false)} height="12" />
              {/* Logo */}
              <circle cx="20" cy="20" r="20" />
            </ContentLoader>
          </div>
          {showAmount && (
            <div className="grow-0">
              <ContentLoader
                key={index}
                speed={2}
                width={56}
                height={40}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                {/* Title */}
                <rect x="0" y="4" rx="3" ry="3" width={56} height="28" />
              </ContentLoader>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
