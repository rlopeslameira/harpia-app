import { Text, View } from 'react-native';
import { useAuth } from '../../contexts/auth';
import DrawerContent from '../../components/DrawerContent';
import { Drawer } from 'expo-router/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Alunos() {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <DrawerContent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Drawer.Screen 
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: '#0284c7'},            
            headerTitleAlign: 'center',
            title: 'Alunos',
          }}
        />
        <Text>
          Alunos
        </Text>
      </View>
    </DrawerContent>
  );
}
