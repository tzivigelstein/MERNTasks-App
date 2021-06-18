import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckIcon = props => (
  <Svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    stroke="#fff"
    strokeWidth={2}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="M20 6L9 17l-5-5" />
  </Svg>
);

export default CheckIcon;
