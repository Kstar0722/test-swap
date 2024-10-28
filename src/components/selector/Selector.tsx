'use client';

/**
 * Ref: https://react-select.com/home
 */
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { twMerge } from 'tailwind-merge';

import { CaretDownSvg } from '@/svgs';

type Option = {
  value: string;
  label: string;
};

export type SelectorProps = {
  options?: Option[];
  onChange?: (value: Option | null) => void;
};

export const Selector = ({ options = [], onChange = () => {} }: SelectorProps) => {
  const id = Date.now().toString();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <ReactSelect
      id={id}
      onChange={onChange}
      options={options}
      classNames={{
        // clearIndicator: () => "",
        // container: () => "",
        control: () => twMerge('!shadow-none !border-pink-1 !border-2 !rounded-xl'),
        // dropdownIndicator: () => "",
        // group: () => "",
        // groupHeading: () => "",
        // indicatorsContainer: () => "",
        indicatorSeparator: () => '!hidden',
        // input: () => "",
        // loadingIndicator: () => "",
        // loadingMessage: () => "",
        menu: () => '!rounded-xl !shadow-2xl !border !border-gray-200 !py-1.5',
        // menuList: () => "",
        // menuPortal: () => "",
        // multiValue: () => "",
        // multiValueLabel: () => "",
        // multiValueRemove: () => "",
        // noOptionsMessage: () => "",
        option: ({ isSelected }) =>
          twMerge(
            '!cursor-pointer !transition-all !bg-white !text-gray-700',
            isSelected ? '!bg-pink-1 !text-yellow-1' : 'hover:!bg-pink-2 hover:!bg-opacity-40',
          ),
        // placeholder: () => "",
        // singleValue: () => "",
        // valueContainer: () => "",
      }}
      components={{
        // ClearIndicator,
        // Control,
        DropdownIndicator,
        // DownChevron,
        // CrossIcon,
        // Group,
        // GroupHeading,
        // IndicatorsContainer,
        // IndicatorSeparator,
        // Input,
        // LoadingIndicator,
        // Menu,
        // MenuList,
        // MenuPortal,
        // LoadingMessage,
        // NoOptionsMessage,
        // MultiValue,
        // MultiValueContainer,
        // MultiValueLabel,
        // MultiValueRemove,
        // Option,
        // Placeholder,
        // SelectContainer,
        // SingleValue,
        // ValueContainer,
      }}
    />
  ) : null;
};

type DropdownIndicatorProps = {
  isFocused: boolean;
};

const DropdownIndicator = ({ isFocused }: DropdownIndicatorProps) => {
  return (
    <div className="w-10 h-10 inline-flex items-center justify-center">
      <CaretDownSvg
        width={22}
        height={22}
        className={twMerge('text-pink-1 transition-all', isFocused ? 'rotate-180' : '')}
      />
    </div>
  );
};
