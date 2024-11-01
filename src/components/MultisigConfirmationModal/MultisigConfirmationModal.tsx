import { Modal, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button2';

import {
  MultisigConfirmationModalContainer,
  MultisigConfirmationModalIcon,
  MultisigConfirmationModalIconContainer,
} from '.';

export const MultisigConfirmationModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open = false, onClose = () => {} }) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
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
          {t('multisig.transactionInitiated.title')}
        </Typography>
        <Typography fontSize={'1.125 rem'} marginY={4}>
          {t('multisig.transactionInitiated.description')}
        </Typography>
        <Button
          aria-label={t('multisig.transactionInitiated.description')}
          variant="primary"
          muiVariant="contained"
          styles={{
            width: '100%',
          }}
          onClick={onClose}
        >
          {t('button.okay')}
        </Button>
      </MultisigConfirmationModalContainer>
    </Modal>
  );
};
