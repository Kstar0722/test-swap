import { motion } from 'framer-motion';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { ArrowLeftRightSvg, SwapSvg } from '@/svgs';

import { PlusSvgs } from './PlusSvgs';
import { useAnimations } from './useAnimations';

export const SwapImage = () => {
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
    <div
      ref={containerRef1}
      className={twMerge(
        'relative inline-flex items-center gap-5 lg:gap-8 rounded-full bg-pink-3',
        animationClassName1,
      )}
    >
      <div ref={containerRef2}>
        <div
          className={twMerge(
            'w-[110px] lg:w-[170px] h-[110px] lg:h-[170px] rounded-full inline-flex items-center justify-center bg-yellow-1',
            animationClassName2,
            'delay-200',
          )}
        >
          <motion.div
            animate={{
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <Image
              src="/images/pngs/dog.png"
              alt="Swap"
              width={512}
              height={204}
              className="w-[60px] lg:w-[100px] h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>

      <div ref={containerRef4} className={twMerge(animationClassName4, 'delay-[1000ms]')}>
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            translateX: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            delay: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <ArrowLeftRightSvg className="w-8 lg:w-12 h-8 lg:h-12 text-white" />
        </motion.div>
      </div>

      <div ref={containerRef3}>
        <div
          className={twMerge(
            'w-[110px] lg:w-[170px] h-[110px] lg:h-[170px] rounded-full inline-flex items-center justify-center bg-yellow-1',
            animationClassName3,
            'delay-500',
          )}
        >
          <motion.div
            animate={{
              opacity: [0.9, 1, 0.9],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <SwapSvg className="w-[70px] lg:w-[122px] h-[70px] lg:h-[122px]" />
          </motion.div>
        </div>
      </div>

      <PlusSvgs />
    </div>
  );
};
