import { Text, View } from 'react-native';

import { useAuth } from '../../contexts/auth';
import DrawerContent from '../../components/DrawerContent';

export default function Index() {
  const { signOut } = useAuth();
  return (
    <DrawerContent>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
    </DrawerContent>
  );
}
