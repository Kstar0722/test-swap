'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { Button, Typography } from '@/components';

import { SwapImage } from './swap-image';
import { useAnimations } from './useAnimations';

export const Home = () => {
  const {
    containerRef1,
    animationClassName1,
    containerRef2,
    animationClassName2,
    containerRef3,
    animationClassName3,
    containerRef4,
    animationClassName4,
  } = useAnimations();

  return (
    <div className="flex flex-col items-center lg:items-start gap-16 lg:gap-12">
      <SwapImage />

      <div className="flex flex-col gap-6 lg:gap-3 text-center lg:text-left">
        <div>
          <div ref={containerRef1}>
            <Typography variant="h1" className={twMerge('leading-[100%]', animationClassName1)}>
              WELCOME TO
            </Typography>
          </div>

          <div ref={containerRef2}>
            <Typography
              variant="h1"
              className={twMerge('leading-[100%]', animationClassName2, 'delay-100')}
            >
              Goodle SWAP
            </Typography>
          </div>
        </div>

        <div ref={containerRef3}>
          <Typography
            variant="h5"
            color="yellow"
            className={twMerge(animationClassName3, 'delay-200')}
          >
            GOODLE vibes only
          </Typography>
        </div>
      </div>

      <div ref={containerRef4} className={twMerge(animationClassName4, 'delay-500')}>
        <motion.div
          animate={{
            translateY: [-4, 4, -4],
          }}
          transition={{
            duration: 3.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <Link href={'/stake'}>
            <Button size="large" className="shadow-xl lg:shadow-none">
              Launch App
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
