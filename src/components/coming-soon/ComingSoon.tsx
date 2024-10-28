import { twMerge } from 'tailwind-merge';

import { Typography } from '@/components';

type ComingSoonProps = {
  description?: string;
  containerClass?: string;
};

export const ComingSoon = ({ description = '', containerClass = '' }: ComingSoonProps) => {
  return (
    <div className={twMerge('flex flex-col items-center gap-2 py-12', containerClass)}>
      <Typography variant="h3" className="text-center">
        COMING SOON!
      </Typography>

      <Typography variant="h6" color="yellow" className="text-center">
        - {description} -
      </Typography>
    </div>
  );
};
