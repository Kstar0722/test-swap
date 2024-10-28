'use client';

import { useState } from 'react';

import { Drawer, Logo } from '@/components';
import { WalletButtons } from '@/components/Navbar/WalletButton/WalletButton';
import { CloseSvg, HamburgerMenuSvg } from '@/svgs';

import { NavItemsMobile } from './NavItemsMobile';

export const HamburgerMenu = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  return (
    <>
      <button onClick={() => setVisibleDrawer(true)}>
        <HamburgerMenuSvg width={24} height={24} className="text-pink-1" />
      </button>

      <Drawer open={visibleDrawer} setOpen={setVisibleDrawer} panelClassName="w-full sm:w-[400px]">
        <div className="flex flex-col gap-1 px-4 pb-12">
          <div className="flex items-center gap-x-4 h-[64px] mb-4">
            <Logo imageContainerClassName="bg-yellow-1" textClassName="text-yellow-1" />

            <div className="pt-3 ml-auto">
              <button
                onClick={() => {
                  setVisibleDrawer(false);
                }}
                className="text-gray-1 hover:text-yellow-1 transition-all"
              >
                <CloseSvg className="w-6 h-6" />
              </button>
            </div>
          </div>

          <NavItemsMobile
            onClose={() => {
              setVisibleDrawer(false);
            }}
          />

          <div className="flex justify-center mt-8 w-full">
            <WalletButtons />
          </div>
        </div>
      </Drawer>
    </>
  );
};
