import { Logo } from '@/components';
import { NavbarButtons } from '@/components/Navbar';
import { NavbarContainer } from '@/components/Navbar';

import { Circles } from './Circles';
import { HamburgerMenu } from './HamburgerMenu';
import { NavItemsDesktop } from './NavItemsDesktop';

export const Header = () => {
  return (
    <header className="fixed top-0 w-full h-[70px] lg:h-24 z-[70]">
      <div className="relative flex items-center gap-20 bg-yellow-1 h-[56px] lg:h-20 px-4 lg:px-8 shadow-xl">
        <div className="absolute -bottom-4 left-0 w-full">
          <Circles />
        </div>

        <Logo href="/" />

        <div className="hidden md:block relative">
          <NavItemsDesktop />
        </div>

        <div className="ml-auto hidden md:block relative">
          <NavbarContainer>
            <NavbarButtons />
          </NavbarContainer>
        </div>

        <div className="relative ml-auto md:hidden pt-3">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};
