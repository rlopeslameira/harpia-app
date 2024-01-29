import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  ScrollView
} from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import variaveis from '../../config/variaveis';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/core';
import { FontAwesome5 } from '@expo/vector-icons';
import Util from '../../services/util';
import * as ImagePicker from 'expo-image-picker';

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
  },
});

const CustomDrawer = (props: any) => {
  const { usuario, signOut } = useAuth();
  const [userImage, setUserImage] = useState(null);
  const isFocused = useIsFocused();
  const [mensagensNaoLidas, setMensagensNaoLidas] = useState('');
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState('');
  const [isAluno, setIsAluno] = useState(true);  
  const [selectedMenu, setSelectedMenu] = useState('Home');
  const insets = useSafeAreaInsets(); 
  const isDrawerOpen = useDrawerStatus() === 'open';
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    let usuarios: any = await AsyncStorage.getItem('usuarios');
    if (usuarios) {
      usuarios = JSON.parse(usuarios);
    } else {
      usuarios = [];
    }

    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      selectionLimit: 1,
      base64: true,
    });

   if (response.canceled) {
      setLoading(false);
    } else {
      let base64image = response?.assets[0]?.base64;

      if (base64image) {
        base64image = base64image.includes('data:image')
          ? base64image
          : 'data:image/jpeg;base64,' + base64image;
        setUserImage(base64image);

        await AsyncStorage.setItem(usuario.matric, base64image);

        api.post('aluno/gravafoto', {
          codigo: usuario.codigo,
          escola: usuario.escola,
          matric: usuario.matric,
          foto: base64image,
        });
      }
    }
    setLoading(false);
  };
  

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
      backgroundColor: '#FFF' // fundo do menu
    }}>
      <View style={{ width: "100%", height: 130, }}>
        <View style={styles.containerInfo}>
          <View
            style={{
              width: '100%',
              padding: 6,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row'
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
              resizeMode='contain'
              style={styles.imageProfile}
              />
            </TouchableOpacity>

            <Image
              source={{
                uri: `http://aplicativomaisescola.com.br/logos/${
                  usuario.codigo
                }.png`,
              }}
              style={styles.logo}
              resizeMode='contain'
            />                      
          </View>
          <View >
            <Text style={{ fontSize: 18, fontWeight: '500', color: '#027DBF', padding: 6}}>
                {Util.getFirstAndLastName(usuario.nome)}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ScrollView style={{ marginTop: 10 }}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            gap: 8
          }}>          
            {props.state?.routes
              .filter((i: any) => i.params?.icon)
              .map((item: any) => (
                  <TouchableOpacity
                    key={item.name}
                    style={ selectedMenu == item.name ? styles.btMenuListActive : styles.btMenuList} activeOpacity={0.7}
                    onPress={() => {
                      setSelectedMenu(item.name);
                      props.navigation.navigate(item.name);
                    }}
                  >
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
                          color={selectedMenu == item.name ? variaveis.textColor : variaveis.secondaryColor}
                          size={32}
                          name={item.params.icon}
                          style={styles.btMenuIcon}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          color={selectedMenu == item.name ? variaveis.textColor : variaveis.secondaryColor}
                          size={32}
                          name={item.params.icon}
                          style={styles.btMenuIcon}
                        />
                      )}
                      <Text style={selectedMenu == item.name ? styles.btMenuTextActive :styles.btMenuText}>
                        {item?.params?.title}
                      </Text>
                  </TouchableOpacity>
              ))}
            <TouchableOpacity style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',    
              backgroundColor: 'transparent',    
              padding: 2,
              marginBottom: 10
            }} activeOpacity={0.7} onPress={signOut} >
              <MaterialCommunityIcons name="exit-run" size={24} color={variaveis.secondaryColor} style={styles.btMenuIcon}/>
              <Text style={styles.btMenuText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CustomDrawer;


const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: 180,
    marginTop: -4,
  },

  containerInfo: {
    flex: 1,
    justifyContent: "center",
    padding: 6,
  },

  imageProfile: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 6,
  },

  logo: {
    width: 120,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 6
  },

  containerData: {
    flex: 1,
    width: '100%',
  },

  textData: {
    fontSize: 12,
    color: "#027DBF",
    fontWeight: "bold",
  },

  // btMenu: {
  //   marginBottom: marginVertical,
  //   marginLeft: marginHorizontal,
  //   marginRight: marginHorizontal,
  //   width: width,
  //   justifyContent: 'center',
  //   alignItems: 'center',    
  //   backgroundColor: '#FFF',    
  //   borderRadius: 10,
  //   padding: 4,
  // },
  btMenuList: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',    
    backgroundColor: 'transparent',    
    padding: 2,
  },  
  btMenuIcon: {
    marginHorizontal: 16,
  },
  btMenuText: {
    fontSize: 14,
    fontWeight: '500',
    color: variaveis.secondaryColor,
    textAlign: 'center',
  },

  btMenuListActive: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',    
    backgroundColor:  variaveis.secondaryColor,    
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    padding: 2,
  },
  btMenuTextActive: {
    fontSize: 14,
    fontWeight: '500',
    color: variaveis.textColor,
    textAlign: 'center',
  },

  btMenuSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4682B4',
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: '#4682B4',
    color: '#FFF',
  }
});
