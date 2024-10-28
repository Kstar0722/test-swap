import { motion } from 'framer-motion';

import { PlusSvg } from '@/svgs';

export const PlusSvgs = () => {
  return (
    <>
      <div className="absolute -top-8 lg:-top-5 -right-8 lg:-right-6">
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <PlusSvg className="w-10 lg:w-12 h-10 lg:h-12 text-white" />
        </motion.div>
      </div>

      <div className="absolute top-4 lg:top-6 -right-12 lg:-right-10">
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <PlusSvg className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
        </motion.div>
      </div>

      <div className="absolute -bottom-8 lg:-bottom-5 -left-8 lg:-left-6">
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3.5,
            delay: 0.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <PlusSvg className="w-10 lg:w-12 h-10 lg:h-12 text-white" />
        </motion.div>
      </div>

      <div className="absolute bottom-4 lg:bottom-6 -left-12 lg:-left-10">
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4.5,
            delay: 1,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <PlusSvg className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
        </motion.div>
      </div>
    </>
  );
};
