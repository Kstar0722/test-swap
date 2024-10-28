'use client';

import { useMemo } from 'react';

import { CircleSvg } from '@/svgs';

// TODO: calc from window size
const circleCount = 200;

export const Circles = () => {
  return (
    <div className="flex items-center w-full overflow-hidden">
      {Array.from(Array(circleCount).keys()).map((item, index) => (
        <CircleSvg
          key={`header-circle-${index}`}
          width={32}
          height={32}
          className="text-yellow-1 shrink-0"
        />
      ))}
    </div>
  );
};
