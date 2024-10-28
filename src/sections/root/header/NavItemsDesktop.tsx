'use client';

import { usePathname } from 'next/navigation';

import { NavItemDesktop } from './NavItemDesktop';
import { useNavItems } from './useNavItems';

export const NavItemsDesktop = () => {
  const pathname = usePathname();
  const { navItems } = useNavItems();

  return (
    <div className="flex items-center gap-9 pt-2">
      {navItems.map((item, index) => (
        <div key={`nav-item-${index}`}>
          <NavItemDesktop
            {...item}
            active={pathname.split('/')?.[1] === item.href?.split('/')?.[1]}
          />
        </div>
      ))}
    </div>
  );
};
