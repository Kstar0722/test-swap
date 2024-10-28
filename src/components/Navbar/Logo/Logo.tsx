'use client';

import ClearIcon from '@mui/icons-material/Clear';
import { useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';

import { useSettingsStore } from '@/stores/settings';

type LogoProps = {
  variant: 'default' | 'learn' | 'scan' | 'superfest';
};

export const Logo = ({ variant }: LogoProps) => {
  const theme = useTheme();
  const configTheme = useSettingsStore((state) => state.configTheme);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      {!isMobile && configTheme?.logo?.url ? (
        <>
          <ClearIcon
            width="32px"
            height="32px"
            sx={{
              color: theme.palette.grey[500],
              width: '32px',
              height: '32px',
              marginLeft: theme.spacing(-2),
              marginRight: theme.spacing(2),
            }}
          />
          <Image
            alt="jumper-partner-logo"
            src={configTheme.logo?.url.href}
            width={configTheme.logo?.width}
            height={configTheme.logo?.height}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
