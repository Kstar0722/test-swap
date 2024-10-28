'use client';

import { usePathname } from 'next/navigation';

import { NavItemMobile } from './NavItemMobile';
import { useNavItems } from './useNavItems';

type NavItemsMobileProps = {
  onClose?: () => void;
};

export const NavItemsMobile = ({ onClose }: NavItemsMobileProps) => {
  const pathname = usePathname();

  const { navItems } = useNavItems();

  return (
    <div className={'flex flex-col items-start gap-4'}>
      {navItems.map((item, index) => (
        <div key={`nav-item-${index}`} className="w-full">
          <NavItemMobile
            {...item}
            active={pathname.split('/')?.[1] === item.href?.split('/')?.[1]}
            onClose={onClose}
          />
        </div>
      ))}
    </div>
  );
};
