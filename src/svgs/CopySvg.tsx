import { SVGProps } from 'react';

export const CopySvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor">
      <rect width={9} height={13} x={6.5} y={6.5} rx={1.5} />
      <path d="M8.5 6A1.5 1.5 0 0 1 10 4.5h6A1.5 1.5 0 0 1 17.5 6v10a1.5 1.5 0 0 1-1.5 1.5" />
    </g>
  </svg>
);