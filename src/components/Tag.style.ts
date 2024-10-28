import type { TypographyProps } from '@mui/material';
import { Typography, alpha, styled } from '@mui/material';

export interface TagProps extends Omit<TypographyProps, 'component'> {
  component?: keyof JSX.IntrinsicElements;
  backgroundColor?: string;
  color?: string;
}

export const Tag = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'backgroundColor',
})<TagProps>(({ theme, backgroundColor, color }) => ({
  height: 48,
  padding: theme.spacing(0, 3),
  textWrap: 'nowrap',
  width: 'fit-content',
  backgroundColor: backgroundColor
    ? backgroundColor
    : theme.palette.mode === 'light'
      ? alpha('#31007A', 0.04)
      : '#31007A',
  color: color ? color : '#000',
  userSelect: 'none',
  borderRadius: '24px',
  flexShrink: 0,
  ':not(:first-of-type)': {
    marginLeft: theme.spacing(0.5),
  },
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
