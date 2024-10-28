import type { WidgetConfig } from '@lifi/widget';
import type { Breakpoint } from '@mui/material';
import { useTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { t } from 'i18next';
import { useTheme as useNextTheme } from 'next-themes';
import { useEffect } from 'react';
import type { PartnerTheme } from 'src/types/strapi';

import { useSettingsStore } from '@/stores/settings';
import { formatTheme } from '@/utils/formatTheme';

export const useWidgetTheme = (): PartnerTheme => {
  const theme = useTheme();
  const { resolvedTheme, forcedTheme } = useNextTheme();
  const [widgetTheme, setWidgetTheme, partnerThemes] = useSettingsStore((state) => [
    state.widgetTheme,
    state.setWidgetTheme,
    state.partnerThemes,
  ]);

  const activeNextTheme = forcedTheme || resolvedTheme;

  const defaultWidgetTheme: { config: Partial<WidgetConfig> } = {
    config: {
      appearance: theme.palette.mode,
      theme: {
        container: {
          borderRadius: '12px',
          maxWidth: '100%',
          [theme.breakpoints.up('sm' as Breakpoint)]: {
            borderRadius: '12px',
            maxWidth: 416,
            minWidth: 416,
            boxShadow:
              theme.palette.mode === 'light'
                ? '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)'
                : '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)',
          },
        },
        shape: {
          borderRadius: 12,
          borderRadiusSecondary: 24,
        },
        //@ts-expect-error // need to write all bodyFont
        typography: {
          fontFamily: 'SofiaProSoft',
        },
        palette: {
          background: {
            paper: '#FCFAFF',
            default: '#FFFFFF',
          },
          primary: {
            main: '#CB00FA',
          },
          secondary: {
            main: '#454545',
          },
          grey: theme.palette.grey,
          text: {
            primary: '#374151',
          },
        },
      },
    },
  };

  useEffect(() => {
    const theme = partnerThemes?.find((d) => d.attributes.uid === activeNextTheme);

    if (!theme) {
      setWidgetTheme(defaultWidgetTheme);
      return;
    }

    const formattedTheme = formatTheme(theme.attributes);

    setWidgetTheme({
      config: deepmerge(defaultWidgetTheme.config, formattedTheme.activeWidgetTheme),
    });
  }, [activeNextTheme, partnerThemes, theme]);

  return widgetTheme || defaultWidgetTheme;
};
