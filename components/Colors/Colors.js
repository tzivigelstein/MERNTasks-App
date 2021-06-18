import React, { useEffect } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from './colors.styles';
import CheckIcon from '../CheckIcon';
import Gradient from 'react-native-linear-gradient';

const Colors = ({
  color,
  listIndex,
  selectedColor,
  setSelectedColor,
  scrollToItem,
}) => {
  const { id, accentColor, secondaryColor, name } = color;

  function handlePress() {
    setSelectedColor(id);
    scrollToItem(listIndex);
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.colorContainer}>
        <Gradient
          angle={45}
          colors={[accentColor, secondaryColor]}
          style={styles.colorBox}>
          {selectedColor === id && <CheckIcon strokeWidth={3} />}
        </Gradient>
        <Text style={styles.colorName}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Colors;
