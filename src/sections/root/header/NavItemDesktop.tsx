import Link from 'next/link';

import { Typography } from '@/components';

export type NavItemDesktopProps = {
  label: string;
  href: string;
  active?: boolean;
};

export const NavItemDesktop = ({ label, href, active = false }: NavItemDesktopProps) => {
  return (
    <Link href={href} className="group py-2">
      <Typography color={active ? 'pink' : 'black'} className="font-bold group-hover:text-pink-2">
        {label}
      </Typography>
    </Link>
  );
};
