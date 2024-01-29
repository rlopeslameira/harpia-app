import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '../../contexts/auth';
import { Drawer } from 'expo-router/drawer';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerSceneWrapper from '../../components/DrawerContent';

export default function Periodos({ navigation }) {
  const { openDrawer } = navigation;

  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <DrawerSceneWrapper>
      
      <StatusBar barStyle='dark-content' />
      <SafeAreaView style={styles.container} >

        <View style={styles.searchBar}>
          <TouchableOpacity onPress={() => {
                  router.back();
                }}>
            <Icon name="backspace" size={26} color="#666" />
          </TouchableOpacity>
          <Text style={styles.searchTextPlaceHolder}>Seleione o Período</Text>
        </View>
           
      <Text>
        Períodos
      </Text>
      </SafeAreaView>
    </DrawerSceneWrapper>
  );
}


const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  wrapper: { padding: 16 },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 50,
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