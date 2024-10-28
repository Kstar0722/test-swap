import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/components';

export type NavItemMobileProps = {
  label: string;
  href: string;
  active?: boolean;
  onClose?: () => void;
};

export const NavItemMobile = ({
  label,
  href,
  active = false,
  onClose = () => {},
}: NavItemMobileProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'group py-2 bg-black rounded-full inline-flex px-6 w-full justify-center',
        active ? 'bg-white' : 'bg-transparent',
      )}
      onClick={() => {
        onClose();
      }}
    >
      <Typography
        className={twMerge(
          'font-bold text-xl',
          active ? 'text-pink-1' : 'group-hover:text-yellow-400',
        )}
      >
        {label}
      </Typography>
    </Link>
  );
};
