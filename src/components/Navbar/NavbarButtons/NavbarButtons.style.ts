'use client';

import type { ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ButtonSecondary } from '@/components/Button2/Button2.style';
import { getContrastAlphaColor } from '@/utils/colors';

export const NavbarButtonsContainer = styled('div')({
  display: 'flex',
  flex: 1,
  justifySelf: 'self-end',
  justifyContent: 'flex-end',
});

export const MenuToggle = styled(ButtonSecondary)<ButtonProps>(({ theme }: any) => ({
  justifyContent: 'center',
  backgroundColor: 'transparent',
  color: theme.palette.mode === 'dark' ? theme.palette.accent1Alt.main : '#31007A',
  width: 48,
  borderRadius: '50%',
  marginLeft: theme.spacing(1.5),
  minWidth: 'unset',
  height: 48,
  ':hover:before': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? getContrastAlphaColor(theme, '12%')
        : theme.palette.alphaDark100.main,
  },
  ':hover': {
    backgroundColor: 'transparent',
  },
}));
