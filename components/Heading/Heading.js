import React from 'react';
import { View, Text } from 'react-native';
import styles from './heading.styles';

const Heading = ({ title, componentLeft, componentRight, children }) => {
  return (
    <View style={styles.heading}>
      {componentLeft}
      <Text style={styles.title}>{title}</Text>
      {componentRight}
    </View>
  );
};

export default Heading;
