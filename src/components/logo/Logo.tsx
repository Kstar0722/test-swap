'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/components';

type LogoProps = {
  href?: string;
  imageContainerClassName?: string;
  imageClassName?: string;
  textClassName?: string;
};

export const Logo = ({
  href = '',
  imageContainerClassName = '',
  imageClassName = '',
  textClassName = '',
}: LogoProps) => {
  const router = useRouter();

  const onLogo = useCallback(() => {
    router.push(href);
  }, [href]);

  return (
    <div
      className={`relative group inline-flex items-center gap-3 ${href ? 'cursor-pointer' : ''}`}
      onClick={onLogo}
    >
      <div
        className={twMerge(
          'rounded-full bg-pink-1 w-9 h-9 flex items-center justify-center transition-all',
          href ? 'group-hover:bg-pink-2' : '',
          imageContainerClassName,
        )}
      >
        <Image
          src={'/images/pngs/dog.png'}
          width={100}
          height={100}
          alt="Goodle Swap"
          className={twMerge('w-7 h-7 object-contain', imageClassName)}
        />
      </div>

      <Typography
        className={twMerge(
          'text-pink-1 text-3xl font-bold mt-2 select-none',
          href ? 'group-hover:text-pink-2' : '',
          textClassName,
        )}
      >
        GoodleSwap
      </Typography>
    </div>
  );
};
