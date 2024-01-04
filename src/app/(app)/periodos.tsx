import { Text, View } from 'react-native';

import { useAuth } from '../../contexts/auth';
import { Drawer } from 'expo-router/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Periodos() {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Drawer.Screen          
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: '#0284c7'},            
            headerTitleAlign: 'center',
            title: 'Selecione o Período',
            headerLeft: (props: any) => (
              <MaterialCommunityIcons name='arrow-left' size={26} color='white' style={{marginLeft: 6}} 
                onPress={() => {
                  router.back();
                }}
              />
            )
          }}
      />
      <Text>
        Períodos
      </Text>
    </View>
  );
}
