import { Redirect } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../../contexts/auth';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from 'twrnc';
import Navigation from '../../navigation';

const Drawer = createDrawerNavigator();

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
    <Navigation />
  );
}
