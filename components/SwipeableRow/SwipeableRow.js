import React from 'react';
import { View, useWindowDimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { snapPoint } from 'react-native-redash';
import BinIcon from '../BinIcon';

const SwipeableRow = ({ children, onDelete, itemId }) => {
  const { width, height } = useWindowDimensions();
  const aspectRatio = width / height;

  const deleteLimit = 85 * aspectRatio;
  const deleteIconWidth = deleteLimit + 21;

  const snapPoints = [deleteLimit, 0];

  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },

    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX;
    },

    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest, {
        overshootClamping: true,
      });
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const opacity = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));

  return (
    <View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: deleteIconWidth,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
          opacity,
        ]}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            translateX.value = width;
            onDelete(itemId);
          }}>
          <BinIcon stroke="red" />
        </TouchableOpacity>
      </Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeableRow;
