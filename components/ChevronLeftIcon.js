import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronLeftIcon = props => (
  <Svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    stroke="rgba(0,0,0,0.8)"
    strokeWidth={2}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

export default ChevronLeftIcon;
