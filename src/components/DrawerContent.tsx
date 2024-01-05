import { useDrawerProgress } from '@react-navigation/drawer'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'

const DrawerContent = ({children}) => {
    const progress = useDrawerProgress();

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp'),
            }
        ]
    }));

    return (
        <Animated.View style={[styles.container, animatedStyle]}>{children}</Animated.View>
    )
}

export default DrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
