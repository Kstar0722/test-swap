'use client';

import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { WalletMenu } from 'src/components/Menus/WalletMenu';

// import { WalletSelectMenu } from 'src/components/Menus/WalletSelectMenu';
import { NavbarButtonsContainer } from '.';
import { WalletButtons } from '../WalletButton/WalletButton';

export const NavbarButtons = () => {
  const walletManagementRef = useRef<HTMLAnchorElement>(null);
  const [walletMngRef, setSalletMngRef] = useState<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (walletManagementRef?.current) setSalletMngRef(walletManagementRef.current);
  }, [walletManagementRef]);
  return (
    <>
      <NavbarButtonsContainer className="settings">
        <Box ref={walletManagementRef}>
          <WalletButtons />
        </Box>
      </NavbarButtonsContainer>
      <WalletMenu anchorEl={walletMngRef || undefined} />
      {/* <WalletSelectMenu anchorEl={walletMngRef || undefined} /> */}
    </>
  );
};
