import Link from 'next/link';
import numeral from 'numeral';

import { Button, Logo, Typography } from '@/components';
import { useStakeContext } from '@/contexts/StakeContext';

export const NoChain = () => {
  const { stakeInfo } = useStakeContext();

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row justify-between px-3 gap-2">
        <div className="bg-white rounded-2xl w-full">
          <div className="flex flex-col gap-5 p-4 lg:p-5">
            <div className="flex flex-row items-center gap-4 justify-end sm:justify-start">
              <section className="flex flex-col pt-10 items-center w-full">
                <Logo
                  imageContainerClassName="w-[82px] h-[82px]"
                  imageClassName="w-[64px] h-[64px]"
                  textClassName="hidden"
                />
                <Typography color="black" className="text-2xl mt-6">
                  Please change the chain of your wallet to Base.
                </Typography>
              </section>
            </div>
            <hr className="border-gray-100 border-2 border-dashed -mx-4 lg:-mx-5" />
          </div>
        </div>
      </div>
    </>
  );
};
