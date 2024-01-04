import { Text, View } from 'react-native';

import { useAuth } from '../../contexts/auth';
import { Drawer } from 'expo-router/drawer';

export default function Alunos() {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Drawer.Screen
          options={{
            headerStyle: {backgroundColor: '#0284c7',},
          }}
        />
       <Text>
        Alunos
      </Text>
    </View>
  );
}
