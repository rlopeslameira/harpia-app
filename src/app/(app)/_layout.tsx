import { Redirect } from 'expo-router';
import { Drawer } from "expo-router/drawer";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../../contexts/auth';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from 'twrnc';
import CustomDrawer from '../../components/CustomDrawer';

export default function AppLayout() {
  const { usuario, loading } = useAuth();
  const insets = useSafeAreaInsets();

  if (loading) {
    return (
      <View style={tw`flex items-center flex-1 justify-center`}>
        <ActivityIndicator size="large" />
        <Text style={tw`text-3xl`}>Aguarde...</Text>
      </View>
    );
  }

  if (!usuario) {
    return <Redirect href="/wellcome" />;
  }

  return (
      <Drawer drawerContent={CustomDrawer}          
        screenOptions={{
          headerStatusBarHeight: insets.top, 
          headerStyle: {height: insets.top, backgroundColor: '#0284c7',},
          headerTintColor: '#FFF',
          drawerStyle: {
            width: '90%',
          },
          drawerType: 'front',
        }}>
        <Drawer.Screen
          name="index"
          initialParams={{title: 'Home', icon: 'home'}}
        />
        <Drawer.Screen
          name="periodos"
          initialParams={{title: 'Períodos', icon: 'calendar'}}
        />
        <Drawer.Screen
          name="alunos"
          initialParams={{title: 'Usuários', icon: 'account-convert-outline'}}
        />
      </Drawer>
  );
}
