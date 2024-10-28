'use client';

import { InfoRounded } from '@mui/icons-material';
import type { Breakpoint } from '@mui/material';
import { Box, Button, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MultisigConfirmationModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 416,
  top: 200,
  [theme.breakpoints.down('md' as Breakpoint)]: {
    top: '50%',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: theme.palette.mode === 'dark' ? '#FFFFFF' : '#31007A',
  boxShadow: theme.palette.shadow.main,
}));

export const MultisigConfirmationModalButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: '24px',
  fontWeight: 700,
  padding: theme.spacing(1.25, 0),
}));

export const MultisigConfirmationModalIconContainer = styled(Box)(({ theme }) => ({
  backgroundColor: alpha('#297EFF', 0.12),
  borderRadius: '100%',
  height: 96,
  width: 96,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export const MultisigConfirmationModalIcon = styled(InfoRounded)(({ theme }) => ({
  margin: theme.spacing(3),
  height: 48,
  width: 48,
  color: '#297EFF',
  zIndex: 2,
}));