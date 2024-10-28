'use client';

import { Button, Typography } from '@/components';

interface Props {
  buttonLabel?: string;
  className?: string;
  outline?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const ActionBtnWithWallet = ({
  buttonLabel,
  className: btnClass,
  outline = false,
  onClick,
  disabled = false,
}: Props) => {
  return (
    <Button
      className={btnClass}
      color="pink"
      outline={outline}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {!outline && (
        <Typography className="text-white font-bold text-center">
          {buttonLabel ? buttonLabel : 'Button'}
        </Typography>
      )}
      {outline && <>{buttonLabel}</>}
    </Button>
  );
};
