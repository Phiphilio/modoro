// WaterFillCircle.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, ClipPath, Rect } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const WaterFillCircle = ({ progress = 0, size = 200, strokeWidth = 10, duration = 1000 }) => {
  const radius = (size - strokeWidth) / 2;
  const animatedProgress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: size * (1 - animatedProgress.value / 100) }],
    };
  });

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: duration,
      easing: Easing.linear,
    });
  }, [progress]);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Defs>
          <ClipPath id="clip">
            <Circle cx={size / 2} cy={size / 2} r={radius} />
          </ClipPath>
        </Defs>
        <Rect width={size} height={size} fill="#e6e6e6" />
        <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]} clipPath="url(#clip)">
          <LinearGradient
            colors={['#0000FF', '#00FFFF']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          />
        </Animated.View>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#0000FF"
          strokeWidth={strokeWidth}
          fill="none"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WaterFillCircle;
