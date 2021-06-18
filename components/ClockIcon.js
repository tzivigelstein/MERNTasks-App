import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const ClockIcon = props => (
  <Svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    stroke="currentColor"
    strokeWidth={2}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Circle cx={12} cy={12} r={10} />
    <Path d="M12 6v6l4 2" />
  </Svg>
);

export default ClockIcon;
