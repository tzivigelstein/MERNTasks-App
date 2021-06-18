import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import styles from './task.styles';
import ClockIcon from '../ClockIcon';
import CheckIcon from '../CheckIcon';
import ChangeTaskState from '../ChangeTaskState/ChangeTaskState';
import SwipeableRow from '../SwipeableRow/SwipeableRow';

const Task = ({ task, colors, handleDelete }) => {
  const { id, name, state, date, dueTo, status } = task;
  const { accentColor, secondaryColor } = colors;

  const [detailHeight] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  /* 
  const statuses = {
    done: { color: '#08a045', text: 'Done' },
    todo: { color: '#ffc107', text: 'To do' },
    pending: { color: '#fff', text: 'Pending' },
    incomplete: { color: '#d64550', text: 'Incomplete' },
  };

  let statusColor;

  Object.entries(status).forEach(([key]) => {
    if (status[key]) {
      statusColor = statuses[key];
    }
  }); */

  function handlePress() {
    Animated.spring(detailHeight, {
      toValue: open ? 0 : 1,
      duration: 500, // <-- animation duration
      easing: Easing.ease(0, 2, 1, -1), // <-- or any easing function
      useNativeDriver: false, // <-- need to set false to prevent yellow box warning
    }).start();
    setOpen(!open);
  }

  const maxHeight = detailHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // <-- any value larger than your content's height
  });

  return (
    <SwipeableRow itemId={id} onDelete={id => handleDelete(id)}>
      <TouchableOpacity
        style={{ marginHorizontal: 16 }}
        activeOpacity={1}
        onPress={handlePress}>
        <Animated.View
          style={[
            styles.container,
            state
              ? { borderLeftColor: '#08a045' }
              : { borderLeftColor: '#ffc107' },
          ]}>
          <View style={styles.taskHeading}>
            <Text style={styles.taskName}>{name}</Text>
            <View style={styles.stateContainer}>
              {state ? (
                <View
                  style={{
                    borderRadius: 999,
                    padding: 2,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#08a045',
                  }}>
                  <CheckIcon
                    strokeWidth={3}
                    width={14}
                    height={14}
                    stroke="#fff"
                  />
                </View>
              ) : (
                <View
                  style={{
                    borderRadius: 999,
                    padding: 2,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ffc107',
                  }}>
                  <ClockIcon
                    strokeWidth={3}
                    width={14}
                    height={14}
                    stroke="#fff"
                  />
                </View>
              )}
            </View>
          </View>
          <Animated.View style={[styles.detailView, { maxHeight }]}>
            <View style={styles.taskOption}>
              <ChangeTaskState state={state} />
            </View>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </SwipeableRow>
  );
};

export default Task;
