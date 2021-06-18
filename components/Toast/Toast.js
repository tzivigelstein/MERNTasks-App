import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from './toast.styles';
import TimesIcon from '../TimesIcon';

const Toast = ({ data }) => {
  const { text, state, callback } = data;
  return (
    <View style={[styles.container, styles[state]]}>
      <Text style={styles.text}>{text}</Text>
      <TouchableWithoutFeedback onPress={callback}>
        <TimesIcon width={16} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Toast;
