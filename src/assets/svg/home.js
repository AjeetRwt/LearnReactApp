import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function home(props) {
  return (
    <Svg
      width="30px"
      height="30px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M1 6v9h5v-4a2 2 0 114 0v4h5V6L8 0 1 6z" fill="#000" />
    </Svg>
  );
}

export default home;
