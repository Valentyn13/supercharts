import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import styles from './SpinLoader.styles';
import Colors from '../../config/colors';
import Size from '../../config/size';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const SpinLoader = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <AnimatedSvg
                width={Size.xxxl}
                height={Size.xxxl}
                viewBox="0 0 50 50"
                style={{ transform: [{ rotate: spin }] }}
            >
                <Defs>
                    <LinearGradient id="spinnerGradient" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0%" stopColor={Colors.primary} stopOpacity="0" />
                        <Stop offset="100%" stopColor={Colors.secondary} stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Circle
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="url(#spinnerGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="80 120"
                />
            </AnimatedSvg>
        </View>
    );
};

export default SpinLoader;
