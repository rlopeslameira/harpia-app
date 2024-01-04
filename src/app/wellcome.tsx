import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';
import variaveis from '../config/variaveis';

export default function Wellcome() {
    const animation = useRef(null);
    const router = useRouter();
    
    useEffect(() => {
        animation.current.play();
    }, [animation])

  return (
    <View style={tw`flex-1 items-center justify-center bg-sky-600 py-4`} >
        <View style={tw`flex-1 items-center justify-around`}>
            <View style={tw``}>
                <Text style={tw`text-white text-xl pb-2`}>Bem vindo ao</Text>
                <Text style={tw`text-white text-5xl`}>Harpia Educacional</Text>
            </View>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 300,
                    height: 'auto',
                }}
                source={require('../animations/wellcome.json')}
            />   
            <TouchableOpacity activeOpacity={0.8} style={tw`bg-white rounded px-4 py-2 mt-4 w-80 touch-pan-down:bg-slate-950`} 
            onPress={() => router.push('/sign-in')}>
                <Text style={tw`text-sky-700 text-xl font-medium text-center`}>Vamos começar</Text>
            </TouchableOpacity>
        </View>
        <Text style={tw`text-white p-2 text-sm`}>Versão {variaveis.versao}</Text>
    </View>
  )
}
