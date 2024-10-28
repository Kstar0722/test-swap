'use client';

import { Transition, TransitionChild } from '@headlessui/react';
import { PropsWithChildren, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type DrawerProps = PropsWithChildren<{
  open?: boolean;
  setOpen?: (value: boolean) => void;
  panelClassName?: string;
}>;

export const Drawer = ({
  children,
  open = false,
  setOpen = () => {},
  panelClassName = '',
}: DrawerProps) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  return (
    <Transition show={open}>
      <div className={'fixed top-0 right-0 w-full h-screen flex items-start'}>
        {/* Background overlay */}
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"
            onClick={() => {
              setOpen(false);
            }}
          ></div>
        </TransitionChild>

        {/* Sliding sidebar */}
        <TransitionChild
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div
            className={twMerge(
              'absolute top-0 right-0 bg-gray-12 w-[50%] h-full shadow-[0px_0px_6px_2px_rgba(0,0,0,0.05)] overflow-scroll border-l border-white bg-[#d109ff5c]',
              panelClassName,
            )}
          >
            {children}
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};
