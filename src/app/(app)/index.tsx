import { Text, View } from 'react-native';

import { useAuth } from '../../contexts/auth';
import { Drawer } from 'expo-router/drawer';

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
      <Drawer.Screen
          options={{
            headerStyle: {backgroundColor: '#0284c7',},
          }}
        />
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
