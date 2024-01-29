import { ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../contexts/auth';
import DrawerContent from '../../components/DrawerContent';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import AnimatedLottieView from 'lottie-react-native';
import variaveis from '../../config/variaveis';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Index = ({ navigation }) => {
  const{ usuario } = useAuth();
  const { openDrawer } = navigation;
  const [nextEvents, setNextEvents] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [message, setMessage] = useState('');
  const [atualizado, setAtualizado] = useState(true);

  const load = async() =>{
    setLoadingEvents(true);
    try{
      const events = await api.get('/calendario', {params: { codigo: usuario.codigo, escola: usuario.escola }});  

      setNextEvents(events.data);

      let token = await AsyncStorage.getItem('token');

      if (token &&token?.length < 80)
      {
        const tokenResult = await axios.post('https://iid.googleapis.com/iid/v1:batchImport', 
        {
          "application": "br.com.maisescolaweb",
          "sandbox": false,
          "apns_tokens":[
            token
          ]
        },
        {
          headers: {
          Authorization: 'key=AAAAG83MPGQ:APA91bFZu5VQkylJRypV13dKRZrZ-_OXzarDfGzJVc4Uw3iEgc1KyMoxfZAaKg3i08PbG-6wGzjxyPltWFnIHkkW458Tu3o_lmBFeiiBr4BbEK_fwAK6-vs8-sV-3sNZF5TuxeaJVhAs'
          }
        });

        // Alert.alert(tokenResult.data?.results[0]?.registration_token);
        await AsyncStorage.setItem('token', tokenResult.data?.results[0]?.registration_token);
        token = tokenResult.data?.results[0]?.registration_token;
      }

      if (token)     
      {
        api.post('aluno/firebase', { codigo: usuario.codigo, token, matric: usuario.matric});
      }
    }catch(error){
      setLoadingEvents(false);
      setMessage(error.message);
    }
    setLoadingEvents(false);
  }

  useEffect(() => {
    navigation.addListener('focus', (focus: any) => {
      load();
    });

    load();
  }, []);

  return (
    <DrawerContent>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView style={styles.container} >
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={openDrawer}>
            <Icon name="menu" size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.searchTextPlaceHolder}>Menu</Text>
        </View>
        <View style={{ 
          alignItems: 'center',
          justifyContent: 'flex-start', 
          backgroundColor: '#FFF',
          borderRadius: 10,
          marginHorizontal: 10,
          borderWidth: 2, borderColor: variaveis.secondaryColor
          }}>
            <View style={{
              borderTopRightRadius: 8, borderTopLeftRadius: 8, 
              backgroundColor: variaveis.primaryColor, width: '100%', alignItems: 'center', flexDirection: 'row'}}>
              <AnimatedLottieView
                source={require('../../animations/calendar_check.json')}
                style={{height: 60, marginTop: 1}}
                autoPlay={true}
                />
              <Text style={{padding: 8, fontSize: 22, color: variaveis.textColor}}>Próximos Eventos</Text>
            </View>
            
          {loadingEvents ? (
            <ActivityIndicator
                size="small"
                color={variaveis.primaryColor}
                style={{padding: 5}}
              />    
          ) : (
          nextEvents?.filter((e, i)=> i < 4).map((e, index) => (
              <View key={index} style={{
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginVertical: 4, 
                  justifyContent: 'flex-start',
                  width: '98%',
                  }}>
                <View style={{
                  width: 60,
                  alignItems: 'center',
                  justifyContent: 'center',  
                  alignSelf: 'stretch',
                  backgroundColor: variaveis.secondaryColor,
                  padding: 6,       
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}>
                  <Text style={{
                    color: variaveis.textColor,
                    fontSize: 28,  
                    fontWeight: 'bold',     
                    height: 32
                    }}>
                      {e.datini.substr(0,2) }
                  </Text>
                  <Text style={{
                    color: variaveis.textColor,
                    fontSize: 18,  
                    }}>
                      {variaveis.meses.find(m => m.mes_ == e.datini.substr(3,2))?.des.substr(0,3)}
                  </Text>
                </View>
                <View style={{
                  padding: 6, 
                  backgroundColor: variaveis.primaryColor, 
                  flex: 1, 
                  justifyContent: 'center', 
                  alignSelf: 'stretch',
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  }}>
                  <View >                
                    <Text style={{color: variaveis.textColor}}>{e.datini}{e.datini != e.datfin ? ' à ' + e.datfin : ''}</Text>
                  </View>
                  <View >
                    <Text style={{color: variaveis.textColor}}>{e.des.trim()}</Text>
                  </View>
                </View>
              </View>
            ))
          )} 
        </View>
        {!atualizado || message.length > 0 && (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: 30,
        }}>
          <Text style={{fontSize: 10, color: '#000'}}>{message}</Text>
          <ActivityIndicator
            size="small"
            color={variaveis.primaryColor}
            style={{padding: 5}}
          />        
        </View>
      )}
      </SafeAreaView>
    </DrawerContent>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: { backgroundColor: '#F5F5F5', flex: 1 },
  wrapper: { padding: 16 },
  searchBar: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 12,
  },
  searchTextPlaceHolder: {
    color: '#666',
    marginLeft: 8,
  },
});