import {
    View,
    Text,
    StyleSheet,
    Platform,
    useWindowDimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useDrawerProgress } from '@react-navigation/drawer';
import tw from 'twrnc';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Util from '../services/util';
import { useAuth } from '../contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import variaveis from '../config/variaveis';

const DrawerSceneWrapper = ({ children }) => {
    const { usuario } = useAuth();
    const progress = useDrawerProgress();
    const insets = useSafeAreaInsets();
    const [isAluno, setIsAluno] = useState(true);

    useEffect(() => {
        setIsAluno(usuario?.matric.substr(0, 2) != '85');
    }, [])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 },
            {
                scale: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp'),
            },
            {
                rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg`,
            },
            {
                translateX: interpolate(
                    progress.value,
                    [0, 1],
                    [0, Platform.OS === 'android' ? - 50 : -60],
                    'clamp',
                ),
            },
        ],
        borderRadius: interpolate(progress.value, [0, 1], [0, 20], 'clamp'),
        overflow: 'hidden',
    }));

    const showToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token)
          Alert.alert('Token', token);
      }
      
    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            {children}
            <View style={{                 
                padding: 4, 
                backgroundColor: variaveis.secondaryColor, 
                paddingBottom: insets.bottom - 10,
                alignItems: 'center'
                }}>
                <Text style={{fontSize: 12, color: variaveis.textColor}}>{usuario?.codigo} - {usuario?.turma} - {usuario.matric} - {Util.getFirstAndLastName(usuario.nome)}</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: variaveis.textColor}}>
                    Período: {usuario?.ano} / {usuario?.seqano}
                </Text>
                <TouchableOpacity onLongPress={showToken}>
                    <Text style={{ fontSize: 10, textAlign: 'center', color: variaveis.textColor, paddingBottom: 4}}>
                        Versão {variaveis.versao}
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default DrawerSceneWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5' // fundo das pages
    },
});