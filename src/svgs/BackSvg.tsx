import { SVGProps } from 'react';

export const BackSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M10.9375 23.4375H42.1875C42.6019 23.4375 42.9993 23.6021 43.2924 23.8951C43.5854 24.1882 43.75 24.5856 43.75 25C43.75 25.4144 43.5854 25.8118 43.2924 26.1049C42.9993 26.3979 42.6019 26.5625 42.1875 26.5625H10.9375C10.5231 26.5625 10.1257 26.3979 9.83265 26.1049C9.53962 25.8118 9.375 25.4144 9.375 25C9.375 24.5856 9.53962 24.1882 9.83265 23.8951C10.1257 23.6021 10.5231 23.4375 10.9375 23.4375Z"
      fill="white"
    />
    <path
      d="M11.5852 25L24.5446 37.9562C24.838 38.2496 25.0028 38.6476 25.0028 39.0625C25.0028 39.4774 24.838 39.8753 24.5446 40.1687C24.2512 40.4621 23.8533 40.627 23.4383 40.627C23.0234 40.627 22.6255 40.4621 22.3321 40.1687L8.26959 26.1062C8.12408 25.9611 8.00863 25.7887 7.92986 25.5988C7.85109 25.409 7.81055 25.2055 7.81055 25C7.81055 24.7945 7.85109 24.591 7.92986 24.4011C8.00863 24.2113 8.12408 24.0389 8.26959 23.8937L22.3321 9.83124C22.6255 9.53784 23.0234 9.37302 23.4383 9.37302C23.8533 9.37302 24.2512 9.53784 24.5446 9.83124C24.838 10.1246 25.0028 10.5226 25.0028 10.9375C25.0028 11.3524 24.838 11.7503 24.5446 12.0437L11.5852 25Z"
      fill="white"
    />
  </svg>
);
