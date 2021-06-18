import React from 'react';
import Svg, { Path } from 'react-native-svg';

const NewIcon = props => (
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
    <Path d="M12 5v14M5 12h14" />
  </Svg>
);

export default NewIcon;
