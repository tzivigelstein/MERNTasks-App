import Svg, { Path } from 'react-native-svg';
import React from 'react';

const TimesIcon = props => (
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
    <Path d="M18 6L6 18M6 6l12 12" />
  </Svg>
);

export default TimesIcon;
