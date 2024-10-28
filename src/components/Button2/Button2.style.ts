'use client';

import type { ButtonProps as MuiButtonProps } from '@mui/material';
import { Button as MuiButton, alpha, darken } from '@mui/material';
//ButtonProps
import { styled } from '@mui/material/styles';

import { getContrastAlphaColor } from '@/utils/colors';

const ButtonBase = styled(MuiButton)<MuiButtonProps>(({ theme }) => ({
  borderRadius: '24px',
  fontSize: '16px',
  letterSpacing: 0,
  textTransform: 'none',
  fontWeight: 'bold',
  transition: 'background-color 250ms',
  overflow: 'hidden',
  color: '#000',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#31007A' : '#31007A',
  },
}));

export const ButtonPrimary = styled(ButtonBase)<MuiButtonProps>(({ theme }) => ({
  color: '#CB00FA',
  backgroundColor: '#CB00FA',
  ':hover': {
    backgroundColor: darken('#CB00FA', 0.16),
  },
}));

export const ButtonSecondary = styled(ButtonBase)<MuiButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? alpha('#31007A', 0.08) : alpha('#31007A', 0.42),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light' ? alpha('#31007A', 0.12) : alpha('#31007A', 0.56),
  },
}));

export const ButtonTransparent = styled(ButtonBase)<MuiButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? alpha('#31007A', 0.12) : alpha('#31007A', 0.08),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? alpha('#31007A', 0.16) : alpha('#31007A', 0.12),
  },
  '&:before': {
    content: '" "',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transition: 'background 250ms',
    background: 'transparent',
  },
  '&:hover:before': {
    background: getContrastAlphaColor(theme, '4%'),
  },
}));

export const SuperfestButton = styled(ButtonBase)<MuiButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? alpha('#31007A', 0.08) : alpha('#31007A', 0.42),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light' ? alpha('#31007A', 0.12) : alpha('#31007A', 0.56),
  },
}));

export const LevelButton = styled(ButtonSecondary)<MuiButtonProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
  paddingLeft: '12px',
  height: '32px',
}));
