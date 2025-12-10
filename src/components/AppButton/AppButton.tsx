import React from 'react';
import { Pressable, Text, PressableProps, View, StyleProp, ViewStyle } from 'react-native';

import styles from './AppButton.styles';

export interface AppButtonProps extends Omit<PressableProps, 'children'> {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
    isActive?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
}

export const AppButton: React.FC<AppButtonProps> = ({
    title,
    onPress,
    disabled = false,
    fullWidth = false,
    isActive = false,
    buttonStyle,
    ...pressableProps
}) => {

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            {...pressableProps}
            style={[styles.button, buttonStyle, isActive && styles.buttonActive]}
        >
            {({ pressed }) => (
                <Text style={[styles.text, isActive && styles.textActive]}>{title}</Text>
            )}
        </Pressable>
    );
};

export default AppButton;
