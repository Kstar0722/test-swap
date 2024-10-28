'use client';

import { Switch as HeadlessuiSwitch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type SwitchProp = {
  onChange?: (value: boolean) => void;
};
export const Switch = ({ onChange }: SwitchProp) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (onChange) {
      onChange(enabled);
    }
  }, [enabled]);

  return (
    <HeadlessuiSwitch
      checked={enabled}
      onChange={setEnabled}
      className="group inline-flex h-7 w-[52px] items-center rounded-lg bg-pink-2 bg-opacity-20 transition data-[checked]:bg-pink-1 data-[checked]:bg-opacity-100"
    >
      <div
        className={twMerge(
          'h-6 w-7 translate-x-0.5 rounded-[6px] bg-white transition group-data-[checked]:translate-x-[22px] inline-flex items-center justify-center text-[11px] font-bold pt-1',
          enabled ? 'text-pink-1' : 'text-pink-2',
        )}
      >
        {enabled ? 'ON' : 'OFF'}
      </div>
    </HeadlessuiSwitch>
  );
};
