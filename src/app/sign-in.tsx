import { router, useFocusEffect } from 'expo-router';
import { Image, Button, View, TextInput, Text, KeyboardAvoidingView, Platform, Touchable, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../contexts/auth';
import { useCallback, useRef, useState } from 'react';

import logoHarpia from '../../assets/logo512.png';
import variaveis from '../config/variaveis';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';
import api from '../services/api';

export default function SignIn() {
  const { signIn } = useAuth();
  const [codigo, setCodigo] = useState('');
  const [matric, setMatric] = useState('');
  const [senha, setSenha] = useState('');
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [loadingInstituicao, setLoadingInstituicao] = useState(false);
  const insets = useSafeAreaInsets();
  const [logo, setLogo] = useState(null);
  const refMatric = useRef(null);

  useFocusEffect(
    useCallback(() => {

      const subShow = Keyboard.addListener('keyboardDidShow', () => {
        console.log('keyboardDidShow', Keyboard.isVisible());
        setKeyboardShow(Keyboard.isVisible());
      });

      const subhide = Keyboard.addListener('keyboardDidHide', () => {
        console.log('keyboardDidShow', Keyboard.isVisible());
        setKeyboardShow(Keyboard.isVisible());
      });

      return () => { subShow.remove(); subhide.remove(); }
    }, [])
  );

  const getEscola = async () => {
    Keyboard.dismiss();

    let escola = null;
    setLoadingInstituicao(true);

    try {
      const response = await api.get('escola', {
        params: {
          codigo,
        },
      });

      escola = response.data;

      if (escola.codigo) {
        await AsyncStorage.setItem('codigoEscola', codigo);
        setLogo('http://aplicativomaisescola.com.br/logos/' + escola.logo);
        refMatric?.current?.focus();
      } else {
        Toast.error('Escola não encontrada!', 'bottom');
        setLogo(null);
      }
    } catch (error) {
      Toast.error('Erro ao tentar carregar a logo da instituição.\n' + error.message, 'bottom');
      setLogo(null);
    }
    setLoadingInstituicao(false);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-sky-600`}>
      <View style={tw`${Platform.OS === 'android' ? 'h-[' + insets.top + 'px]' : ''} bg-white`}></View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={tw`flex`}>
          <View style={tw`flex-1 justify-center bg-white justify-between`}>

            <View style={tw`flex-row justify-start ${Platform.OS == 'ios' ? 'mt-2' : ''}`}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()} style={tw`p-3 bg-sky-600 rounded-tr-2xl rounded-bl-2xl ml-3`}>
                <FontAwesome5 name="arrow-left" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>

            {loadingInstituicao ? (
              <View style={tw`flex-1 justify-center`}>
                <ActivityIndicator size='large' color="#0284c7" />
              </View>
            ) : (
              <View style={tw`w-100 flex-1 justify-center`}>
                <Image source={logo ? { uri: logo } : logoHarpia} style={{ width: 300, height: 200, alignSelf: 'center', }} resizeMode="contain" />
              </View>
            )}

            <View style={{
              flex: 1,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              alignItems: 'center',
              backgroundColor: '#0284c7',
              marginTop: 10,
              padding: 20,
            }} >
              <View>
                <Text style={tw`ml-2 p-1 text-white`}>Código da Instituição</Text>
                <TextInput
                  returnKeyType='next'
                  keyboardType='numeric'
                  style={tw`bg-white rounded px-4 py-2 w-70 touch-pan-down:bg-slate-950`}
                  placeholderTextColor={variaveis.placeholderTextColor}
                  placeholder='12345' value={codigo} onChangeText={setCodigo} onBlur={() => getEscola()} />
              </View>
              <View>
                <Text style={tw`ml-2 p-1 text-white`}>Matrícula</Text>
                <TextInput
                  returnKeyType='next'
                  keyboardType='numeric'
                  ref={refMatric}
                  style={tw`bg-white rounded px-4 py-2 w-70 touch-pan-down:bg-slate-950`}
                  placeholderTextColor={variaveis.placeholderTextColor}
                  placeholder='1800001' value={matric} onChangeText={setMatric} />
              </View>
              <View>
                <Text style={tw`ml-2 p-1 text-white`}>Senha</Text>
                <TextInput
                  returnKeyType='done'
                  secureTextEntry={true}
                  style={tw`bg-white rounded px-4 py-2 w-70 touch-pan-down:bg-slate-950`}
                  placeholderTextColor={variaveis.placeholderTextColor}
                  placeholder='*******' value={senha} onChangeText={setSenha} />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={tw`bg-white rounded px-4 py-2 mt-6 w-70 touch-pan-down:bg-slate-950`}
                onPress={() => {
                  signIn({ codigo, matric, senha });
                  router.replace('/');
                }}>
                <Text style={tw`text-sky-700 text-xl font-bold text-center`}>
                  Entrar
                </Text>
              </TouchableOpacity>
              <Text style={tw`text-white text-lg text-center p-5`}>Versão {variaveis.versao}</Text>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
