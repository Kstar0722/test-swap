'use client';

import { ReactNode, useMemo } from 'react';
import { Tooltip } from 'react-tooltip';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/components';
import { CircleQuestionSvg } from '@/svgs';

type TooltipLabelProps = {
  label: string;
  tooltipContent?: string;
  tooltipPlace?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';
  tooltipClassName?: string;
  className?: string;
  icon?: ReactNode;
};

export const TooltipLabel = ({
  label = '',
  tooltipContent = '',
  tooltipPlace = 'right',
  tooltipClassName = '',
  className = '',
  icon,
}: TooltipLabelProps) => {
  const tooltipId = useMemo(() => {
    return label.toLocaleLowerCase().trim().replaceAll(' ', '-');
  }, [label]);

  return (
    <div className="flex items-center gap-2">
      <Typography color="black">{label}</Typography>

      <Tooltip id={tooltipId} />

      <div
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
        data-tooltip-place={tooltipPlace}
        data-tooltip-class-name={twMerge(
          '!w-60 !bg-pink-3 !text-yellow-1 !rounded-xl z-[1] relative',
          tooltipClassName,
        )}
        className={twMerge('inline-flex -mt-0.5', className)}
      >
        {icon ? icon : <CircleQuestionSvg className="text-pink-1 cursor-pointer" />}
      </div>
    </div>
  );
};
