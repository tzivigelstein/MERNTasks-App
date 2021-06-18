import React, { useEffect, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import styles from './connectionstatusindicator.styles';

const ConnectionStatusIndicator = ({ isConnected, connectionType }) => {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [isConnected, connectionType]);

  const maxHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  return (
    <>
      {!isConnected && (
        <Animated.View style={[styles.offlineContainer, { maxHeight }]}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </Animated.View>
      )}

      {connectionType === 'cellular' && (
        <Animated.View style={[styles.mobileContainer, { maxHeight }]}>
          <Text style={styles.mobileText}>Connected over mobile data</Text>
        </Animated.View>
      )}
    </>
  );
};

export default ConnectionStatusIndicator;
