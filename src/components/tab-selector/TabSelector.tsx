import { twMerge } from 'tailwind-merge';

import { Typography } from '../typography';

interface Props {
  config?: {
    label: string;
    value: string;
  };
  data: any[];
  value: any;
  setValue: (value: any) => void;
}

export const TabSelector = ({
  config = {
    label: 'label',
    value: 'value',
  },
  data,
  value,
  setValue,
}: Props) => {
  return (
    <div className="flex gap-4">
      {data.map((item) => (
        <div
          key={item[config.value]}
          className={twMerge(
            'cursor-pointer rounded-full py-1 px-3 border-2 border-pink-1 rounded-lg hover:border-yellow-300/30 hover:bg-yellow-300/30',
            value === item[config.value] && 'border-yellow-300 bg-yellow-300',
          )}
          onClick={() => setValue(item[config.value])}
        >
          <Typography className="text-pink-1">{item[config.label]}</Typography>
        </div>
      ))}
    </div>
  );
};
