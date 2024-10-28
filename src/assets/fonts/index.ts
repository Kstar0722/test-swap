import localFont from 'next/font/local';

export const sofiaProSoftFont = localFont({
  src: [
    {
      path: './SofiaProSoft/SofiaProSoftLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './SofiaProSoft/SofiaProSoftReg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SofiaProSoft/SofiaProSoftMed.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './SofiaProSoft/SofiaProSoftBold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});
