import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Button,
  Text
} from 'react-native';
import { DrawerContentScrollView, useDrawerStatus } from '@react-navigation/drawer';
import { styles } from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import variaveis from '../../config/variaveis';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/core';
import { FontAwesome5 } from '@expo/vector-icons';
import { style } from 'twrnc';


const marginHorizontal = 4;
const marginVertical = 4;
const width = '28%';

const stylesGrid = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: "flex-start",
    // marginTop: Platform.OS == 'ios' ? -30 : 0,
    backgroundColor: '#CFC'
  },
  boxContainer: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: width,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    //  backgroundColor: '#FF0',
  },
});

const CustomDrawer = (props: any) => {
  const { usuario, signOut } = useAuth();
  const [userImage, setUserImage] = useState(null);
  const [isAluno, setIsAluno] = useState(true);
  const isFocused = useIsFocused();
  const [mensagensNaoLidas, setMensagensNaoLidas] = useState('');
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState('');

  const insets = useSafeAreaInsets();
  const isDrawerOpen = useDrawerStatus() === 'open';

  useEffect(() => {
    if (usuario)
      if (isAluno)
        loadCount();
      else
        loadCountFun();
  }, [isDrawerOpen])

  const loadCount = async () => {
    setNotificacoesNaoLidas('...');
    setMensagensNaoLidas('...')
    const resp = await api.get('/chat/aluno/count', {
      params: {
        codigo: usuario.codigo,
        matric: usuario.matric
      }
    })
    const resNotificacoes = await api.get('/notificacoes/totalnaolidas', {
      params: {
        codigo: usuario.codigo,
        matric: usuario.matric
      }
    })

    setMensagensNaoLidas(resp.data?.total);
    setNotificacoesNaoLidas(resNotificacoes.data?.total);
  }

  const loadCountFun = async () => {
    setMensagensNaoLidas('...')
    const resp = await api.get('/chat/funcionario/contador', {
      params: {
        codigo: usuario.codigo,
        matric: usuario.matric,
        escola: usuario.escola,
        ano: usuario.ano,
        seqano: usuario.seqano,
      }
    })
    console.log(resp.data);
    setMensagensNaoLidas(resp.data?.total);
  }

  const handleSelectImage = async () => {
    // setLoading(true);

    // let usuarios: any = await AsyncStorage.getItem('usuarios');
    // if (usuarios) {
    //   usuarios = JSON.parse(usuarios);
    // } else {
    //   usuarios = [];
    // }

    // const response = await launchImageLibrary({
    //   mediaType: 'photo',
    //   quality: 0.5,
    //   maxWidth: 1000,
    //   maxHeight: 1000,
    //   selectionLimit: 1,
    //   includeBase64: true,
    // });

    // if (response.errorCode) {
    //   // console.log('Erro ao selecionar a imagem: ', response.errorCode);
    // } else if (response.didCancel) {
    //   // setLoading(false);
    // } else {
    //   let base64image = response?.assets[0]?.base64;

    //   if (base64image) {
    //     base64image = base64image.includes('data:image')
    //       ? base64image
    //       : 'data:image/jpeg;base64,' + base64image;
    //     setUserImage(base64image);

    //     await AsyncStorage.setItem(usuario.matric, base64image);

    //     api.post('aluno/gravafoto', {
    //       codigo: usuario.codigo,
    //       escola: usuario.escola,
    //       matric: usuario.matric,
    //       foto: base64image,
    //     });
    //   }
    // setLoading(false);
  };

  const showToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token)
      Alert.alert('Token', token);
  }

  useEffect(() => {
    async function loadUserImage() {
      const img = await AsyncStorage.getItem(usuario.matric);
      if (img) {
        setUserImage(img.includes('data:image') ? img : 'data:image/jpeg;base64,' + img);
      } else {
        setUserImage(null);
      }
    }

    if (usuario) {
      loadUserImage();
    }

    setIsAluno(usuario?.matric.substr(0, 2) != '85');
  }, [usuario]);

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      backgroundColor: '#0284c7'
    }}>
      <View style={{ width: "100%", height: 180, marginTop: -4, backgroundColor: '#028' }}>
        <View style={styles.containerInfo}>
          <View
            style={{
              width: '100%',
              padding: 6,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => handleSelectImage()}>
              <Image
                source={
                  userImage
                    ? { uri: userImage }
                    : require('../../../assets/favicon.png')
                }
                style={styles.imageProfile}
              />
            </TouchableOpacity>
            <Image
              source={{
                uri: `http://aplicativomaisescola.com.br/logos/${usuario.codigo
                  }.png`,
              }}
              style={styles.logo}
            />
          </View>
          <View style={styles.containerData}>
            <Text style={styles.textData}>
              {usuario.matric} - {usuario.nome}
            </Text>
            {isAluno && (
              <Text style={styles.textData} numberOfLines={1}>
                {usuario.turma} - {usuario.turma_des}
              </Text>
            )}
            <Text style={styles.textData} numberOfLines={1}>
              Período: {usuario?.ano} / {usuario?.seqano}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: "flex-start",
        }}>
          {props.state?.routes
            .filter((i: any) => i.params?.icon)
            .map((item: any) => (
              <TouchableOpacity
                key={item.name}
                style={stylesGrid.boxContainer}
                onPress={() => props.navigation.navigate(item.name)}
              >
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  {/* {item.name == 'Chat' && mensagensNaoLidas !== '' && mensagensNaoLidas != '0' && (
                    <Badge // bg="red.400"
                        colorScheme="danger" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                          fontSize: 12
                        }}>
                        {mensagensNaoLidas}
                    </Badge>
                  )}

                  {item.name == 'Notificacoes' && notificacoesNaoLidas !== '' && notificacoesNaoLidas != '0' && (
                    <Badge // bg="red.400"
                        colorScheme="danger" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                          fontSize: 12
                        }}>
                        {notificacoesNaoLidas}
                    </Badge>
                  )} */}
                  {item?.params?.FA ? (
                    <FontAwesome5
                      color="black"
                      size={40}
                      name={item.params.icon}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      color="black"
                      size={40}
                      name={item.params.icon}
                    />
                  )}
                  <Text style={{ color: "black", fontSize: 12, textAlign: "center" }}>
                    {item?.params?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        <View
          style={{
            height: 46,
            padding: 4,
            borderTopWidth: 0.5,
            borderTopColor: '#CCC',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onLongPress={showToken}>
            <Text style={{ fontSize: 10, textAlign: 'center', paddingLeft: 6 }}>
              Versão {variaveis.versao}
            </Text>
          </TouchableOpacity>
          <Button title='Sair' color='black' onPress={signOut} />
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
