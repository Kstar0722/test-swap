import { Avatar, Box, Skeleton } from '@mui/material';
import { darken, styled } from '@mui/material/styles';

export const AvatarSkeletonContainer = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: '50%',
}));

export const LargeAvatar = styled(Avatar)(({ theme }) => ({
  background: 'transparent',
  width: 44,
  position: 'relative',
  height: 44,
  left: 6,
  top: 4.5,
  border: `6px solid transparent`,
  '& img': {
    objectFit: 'contain',
  },
}));

export const LargeAvatarSkeletonBase = styled(Skeleton)(({ theme }) => ({
  border: `6px solid ${'#31007A'}`,
  width: 44,
  height: 44,
}));

export const SmallAvatar = styled(Avatar)(({ theme }) => ({
  background: '#fff',
  width: 16,
  height: 16,
  top: theme.spacing(-0.25),
  backgroundColor: '#31007A',
  // img: {
  //   padding: theme.spacing(0.25),
  //   borderRadius: '50%',
  //   objectFit: 'contain',
  //   background:
  //     theme.palette.mode === 'dark' ? '#FFFFFF' : 'inherit',
  // },
}));

export const SmallAvatarSkeletonBase = styled(Skeleton)(({ theme }) => ({
  border: `2px solid ${
    theme.palette.mode === 'dark' ? theme.palette.alphaLight400.main : darken('#FFFFFF', 0.04)
  }`,
  width: 16,
  height: 16,
}));
