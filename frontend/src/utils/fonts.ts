import localFont from 'next/font/local';

export const oleoScript = localFont({
  src: [
    {
      path: './fonts/OleoScriptSwashCaps-Regular.woff',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-oleo-script',
  display: 'swap',
});
