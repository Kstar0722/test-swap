import { Typography } from '@/components';

import { Circle } from './Circle';

export const Circle8 = () => {
  return (
    <Circle className="top-auto left-auto -bottom-10 -right-10 w-60 h-60">
      <div className="hidden lg:flex flex-col items-center justify-center absolute top-0 left-0 bottom-5 right-5">
        <Typography variant="h6" color="yellow" className="rotate-6">
          WOOF!
        </Typography>

        <Typography variant="h6" color="yellow" className="-rotate-3 ml-8 mt-4">
          WOOF!
        </Typography>
      </div>
    </Circle>
  );
};
