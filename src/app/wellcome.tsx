import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Platform, Keyboard } from 'react-native'
import LottieView from 'lottie-react-native';
import tw from 'twrnc';
import { useFocusEffect, useRouter } from 'expo-router';
import variaveis from '../config/variaveis';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound: '../../assets/notification2.wav',  
        showBadge: true      
      });
    }
  
    if (Device.isDevice) {
      
      // const { status: existingStatus } = await Notifications.getPermissionsAsync();
      // console.log('existingStatus', existingStatus);
      // let finalStatus = existingStatus;
      // if (existingStatus !== 'granted') {
    
      //   console.log('antes');
      //   const result = await Notifications.requestPermissionsAsync();
      //   console.log('depois');
  
      //   finalStatus = result.status;
      // }
      // if (finalStatus !== 'granted') {
      //   alert('Failed to get push token for push notification!');
      //   return;
      // }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token.data);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

export default function Wellcome() {
    const animation = useRef(null);
    const router = useRouter();
    
    useEffect(() => {
        animation.current.play();
    }, [animation])

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef(null);
    const responseListener = useRef(null);

    useEffect(() => {
        try{
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        }catch(error){
        console.log('registerForPushNotificationsAsync', error.message);
        }

        notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
        console.log(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

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
