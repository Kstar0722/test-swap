import { Modal, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button2';

import {
  MultisigConnectedAlertContainer,
  MultisigConnectedAlertIcon,
  MultisigConnectedAlertIconContainer,
} from '.';

export const MultisigConnectedAlert: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open = false, onClose = () => {} }) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <MultisigConnectedAlertContainer>
        <MultisigConnectedAlertIconContainer>
          <MultisigConnectedAlertIcon />
        </MultisigConnectedAlertIconContainer>
        <Typography
          fontWeight={700}
          textAlign={'center'}
          marginY={4}
          style={{
            fontSize: '1.125rem',
          }}
        >
          {t('multisig.connected.title')}
        </Typography>
        <Typography fontSize={'1.125 rem'} marginY={4}>
          {t('multisig.connected.description')}
        </Typography>
        <Button
          aria-label="Close"
          variant="primary"
          onClick={onClose}
          styles={{
            width: '100%',
          }}
        >
          {t('button.okay')}
        </Button>
      </MultisigConnectedAlertContainer>
    </Modal>
  );
};
