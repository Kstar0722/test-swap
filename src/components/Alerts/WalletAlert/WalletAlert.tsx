import { Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/Button2';
import {
  MultisigConfirmationModal,
  MultisigConfirmationModalContainer,
  MultisigConfirmationModalIcon,
  MultisigConfirmationModalIconContainer,
} from 'src/components/MultisigConfirmationModal';
import { useMetaMask } from 'src/hooks/useMetaMask';

import { InfoAlert } from '../InfoAlert';

export const WalletAlert = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isMetaMaskConnector } = useMetaMask();
  const theme = useTheme();

  const title = 'Metamask update is required';
  const subtitle =
    'Please update MetaMask to the latest version. This update solves a bug present in older versions.';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isMetaMaskConnector) {
      setIsOpen(true);
    }
  }, [isMetaMaskConnector]);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <Modal open={isOpen} onClose={onClose}>
          <MultisigConfirmationModalContainer>
            <MultisigConfirmationModalIconContainer>
              <MultisigConfirmationModalIcon />
            </MultisigConfirmationModalIconContainer>
            <Typography
              fontWeight={700}
              textAlign={'center'}
              marginY={4}
              style={{
                fontSize: '1.125rem',
              }}
            >
              {title}
            </Typography>
            <Typography fontSize={'1.125 rem'} marginY={4}>
              {subtitle}
            </Typography>
            <Button
              variant="primary"
              muiVariant="contained"
              styles={{
                width: '100%',
              }}
              onClick={onClose}
            >
              {'I confirm'}
            </Button>
          </MultisigConfirmationModalContainer>
        </Modal>
      ) : (
        <InfoAlert active={true} title={title} subtitle={subtitle} />
      )}
    </>
  );
};
