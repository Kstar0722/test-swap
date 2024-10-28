'use client';

import { Box, styled } from '@mui/material';

export interface WidgetContainerProps {
  welcomeScreenClosed: boolean;
}

export const WidgetContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'welcomeScreenClosed',
})<WidgetContainerProps>(({ theme, welcomeScreenClosed = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(0, 'auto', 3),
  overflow: !welcomeScreenClosed ? 'hidden' : 'inherit',
  width: '100%',
  minHeight: '50vh',
  transitionProperty: 'max-height',
  transitionDuration: '.3s',
  transitionTimingFunction: 'ease-in-out',
  maxHeight: 'inherit',

  // radial shadow glow -> animation
  '&:hover:before': {
    ...(!welcomeScreenClosed && {
      opacity: theme.palette.mode === 'dark' ? 0.48 : 0.34,
      top: '45%',
    }),
  },

  // setting hover animations on widget wrappers

  '.welcome-screen-container + & .widget-wrapper > div': {
    cursor: 'pointer',
  },

  // // TODO move to welcome screen component
  '.welcome-screen-container + &': {
    maxHeight: !welcomeScreenClosed ? '50vh' : 'auto',
  },

  // radial shadow glow
  '.welcome-screen-container + &:before': {
    content: '" "',
    transitionProperty: 'top, opacity',
    transitionDuration: '.4s',
    transitionTimingFunction: 'ease-in-out',
    background:
      theme.palette.mode === 'dark'
        ? 'radial-gradient(50% 50% at 50% 50%, #6600FF 0%, rgba(255, 255, 255, 0) 100%);'
        : 'radial-gradient(50% 50% at 50% 50%, #8700B8 0%, rgba(255, 255, 255, 0) 100%);',
    position: 'absolute',
    zIndex: -1,
    pointerEvents: 'none',
    width: 1080,
    height: 1080,
    maxWidth: '90vw',
    maxHeight: '90vh',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    top: '50%',
    opacity:
      !welcomeScreenClosed && theme.palette.mode === 'dark'
        ? 0.24
        : !welcomeScreenClosed && theme.palette.mode === 'light'
          ? 0.12
          : 0,
  },
}));
