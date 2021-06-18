import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './changetaskstate.styles';
import ClockIcon from '../ClockIcon';
import CheckIcon from '../CheckIcon';

const ChangeTaskState = ({ state }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.optionChange,
        state ? { borderColor: '#ffc107' } : { borderColor: '#08a045' },
      ]}
      onPress={() => console.log('change due to', !state)}>
      <Text style={styles.optionChangeText}>Mark as</Text>
      {state ? (
        <View
          style={[
            {
              borderRadius: 999,
              padding: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
            state
              ? { backgroundColor: '#ffc107' }
              : { backgroundColor: '#08a045' },
          ]}>
          <ClockIcon strokeWidth={3} width={14} height={14} stroke="#fff" />
        </View>
      ) : (
        <View
          style={[
            {
              borderRadius: 999,
              padding: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
            state
              ? { backgroundColor: '#ffc107' }
              : { backgroundColor: '#08a045' },
          ]}>
          <CheckIcon strokeWidth={3} width={14} height={14} stroke="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ChangeTaskState;
