// import InfoIcon from '@mui/icons-material/';
import { Slide, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import { InfoMessageCard, InfoMessageCardTitle } from '@/components/MessageCard';

import { InfoAlertContainer } from '.';

export interface InfoAlertProps {
  title: string;
  subtitle: string;
  active: boolean;
}

export const InfoAlert = ({ title, subtitle, active }: InfoAlertProps) => {
  const [closed, setClosed] = useState(false);
  const theme = useTheme();
  // const handleClose = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) => {
  //   event.stopPropagation();
  //   setClosed(true);
  // };

  useEffect(() => {
    active && setClosed(false);
  }, [active]);

  return (
    <Slide
      direction="up"
      in={!closed && active}
      unmountOnExit
      appear={!closed && active}
      timeout={500}
      easing={'cubic-bezier(0.32, 0, 0.67, 0)'}
    >
      <InfoAlertContainer>
        <InfoMessageCard mt={theme.spacing(4)} mb={theme.spacing(4)}>
          <InfoMessageCardTitle display="flex" alignItems="center" px={2} pt={2}>
            <Typography variant={'h4'}>{title}</Typography>
          </InfoMessageCardTitle>
          <Typography variant={'body1'} pt={theme.spacing(1.5)}>
            {subtitle}
          </Typography>
        </InfoMessageCard>
      </InfoAlertContainer>
    </Slide>
  );
};
