'use client';

import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from 'src/theme';

import type { PartnerThemesData } from '@/types/strapi';
import { formatTheme, getAvailableThemeModes } from '@/utils/formatTheme';

function getPartnerTheme(themes: PartnerThemesData[], activeTheme?: string) {
  return themes?.find((d) => d.attributes.uid === activeTheme)?.attributes;
}

function getMuiTheme(themes: PartnerThemesData[], activeTheme?: string) {
  if (activeTheme && ['dark', 'system'].includes(activeTheme)) {
    return darkTheme;
  } else if (activeTheme === 'light') {
    return lightTheme;
  }

  const partnerTheme = getPartnerTheme(themes, activeTheme);

  if (!partnerTheme) {
    return lightTheme;
  }

  const formattedTheme = formatTheme(partnerTheme);
  const baseTheme = getAvailableThemeModes(partnerTheme).includes('light') ? lightTheme : darkTheme;

  return deepmerge(baseTheme, formattedTheme.activeMUITheme);
}

interface ThemeProviderV2Props {
  children: React.ReactNode;
  activeTheme?: string;
  themes: PartnerThemesData[];
}

/**
 * Your app's theme provider component.
 * provider for the MUI theme context, mainly setting up the MUI provider, very linked to the next-theme provider
 */
export function ThemeProviderV2({ children, activeTheme, themes }: ThemeProviderV2Props) {
  const { resolvedTheme, forcedTheme } = useTheme();

  const themeToUse = forcedTheme || activeTheme;

  const [currentTheme, setCurrentTheme] = useState(getMuiTheme(themes, themeToUse));

  useEffect(() => {
    const themeToUse = forcedTheme || resolvedTheme || activeTheme;
    setCurrentTheme(getMuiTheme(themes, themeToUse));
  }, [resolvedTheme]);

  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>
    </>
  );
}
