import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function filter(props) {
  return (
    <Svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 10.5A3.502 3.502 0 0018.355 8H21a1 1 0 100-2h-2.645a3.502 3.502 0 00-6.71 0H3a1 1 0 000 2h8.645A3.502 3.502 0 0015 10.5zM3 16a1 1 0 100 2h2.145a3.502 3.502 0 006.71 0H21a1 1 0 100-2h-9.145a3.502 3.502 0 00-6.71 0H3z"
        fill="#000"
      />
    </Svg>
  );
}

export default filter;
